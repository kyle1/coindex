using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public class AssetSectionsRepository : IAssetSectionsRepository
    {
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
            
            section.Title = sectionDto.Title;
            section.Body = sectionDto.Body;
            section.SortOrder = sectionDto.SortOrder;

            context.SaveChanges();
        }
    }
}