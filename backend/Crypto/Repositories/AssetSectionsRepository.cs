using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crypto.Repositories
{
    public class AssetSectionsRepository : IAssetSectionsRepository
    {
        public List<SectionCategory> GetSectionCategories()
        {
            var context = new CryptoDbContext();
            var categories = context.SectionCategories.OrderBy(x => x.SortOrder).ToList();
            return categories;
        }

        public SectionCategory GetSectionCategory(int id)
        {
            var context = new CryptoDbContext();
            var category = context.SectionCategories.SingleOrDefault(x => x.SectionCategoryId == id);
            return category;
        }

        public void CreateSectionCategory(SectionCategory category)
        {
            var context = new CryptoDbContext();
            context.SectionCategories.Add(category);
            context.SaveChanges();
        }

        public void UpdateSectionCategory(SectionCategory updatedCategory)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.AssetSections.Add(updatedSection);
            context.Entry(updatedCategory).State = EntityState.Modified;
            context.SaveChanges();
        }

        public AssetSection GetAssetSection(int id)
        {
            var context = new CryptoDbContext();
            var section = context.AssetSections.SingleOrDefault(x => x.AssetSectionId == id);
            return section;
        }

        public void CreateAssetSection(AssetSection section)
        {
            var context = new CryptoDbContext();
            context.AssetSections.Add(section);
            context.SaveChanges();
        }

        public void UpdateAssetSection(AssetSection updatedSection)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.AssetSections.Add(updatedSection);
            context.Entry(updatedSection).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}