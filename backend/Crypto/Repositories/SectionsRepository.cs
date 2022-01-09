using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crypto.Repositories
{
    public class SectionsRepository : ISectionsRepository
    {
        public List<Section> GetSections()
        {
            var context = new CryptoDbContext();
            var sections = context.Sections.OrderBy(x => x.SortOrder).ToList();
            return sections;
        }

        public Section GetSection(int id)
        {
            var context = new CryptoDbContext();
            var section = context.Sections.SingleOrDefault(x => x.SectionId == id);
            return section;
        }

        public void CreateSection(Section section)
        {
            var context = new CryptoDbContext();
            context.Sections.Add(section);
            context.SaveChanges();
        }

        public void UpdateSection(Section updatedSection)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.Sections.Add(updatedSection);
            context.Entry(updatedSection).State = EntityState.Modified;
            context.SaveChanges();
        }

        public SectionEntry GetSectionEntry(int id)
        {
            var context = new CryptoDbContext();
            var section = context.SectionEntries.SingleOrDefault(x => x.SectionEntryId == id);
            return section;
        }

        public void CreateSectionEntry(SectionEntry entry)
        {
            var context = new CryptoDbContext();
            context.SectionEntries.Add(entry);
            context.SaveChanges();
        }

        public void UpdateSectionEntry(SectionEntry updatedEntry)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.AssetSections.Add(updatedSection);
            context.Entry(updatedEntry).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}