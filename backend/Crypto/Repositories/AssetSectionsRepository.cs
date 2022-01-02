using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public class AssetSectionsRepository : IAssetSectionsRepository
    {
        public List<SectionCategory> GetSectionCategories()
        {
            var context = new CryptoDbContext();
            var categories = context.SectionCategories.ToList();
            return categories;
        }

        public AssetSection GetAssetSection(int id)
        {
            var context = new CryptoDbContext();
            var section = context.AssetSections.SingleOrDefault(x => x.AssetSectionId == id);
            return section;
        }

        public void UpdateAssetSection(AssetSectionDto sectionDto)
        {
            var context = new CryptoDbContext();
            var section = context.AssetSections.Single(x => x.AssetSectionId == sectionDto.AssetSectionId);
            
            section.Body = sectionDto.Body;

            context.SaveChanges();
        }
    }
}