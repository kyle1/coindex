using System.Collections.Generic;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface ISectionsRepository
    {
        List<Section> GetSections();
        Section GetSection(int id);
        void CreateSection(Section section);
        void UpdateSection(Section updatedSection);
        SectionEntry GetSectionEntry(int id);
        void CreateSectionEntry(SectionEntry entry);
        void UpdateSectionEntry(SectionEntry updatedEntry);
    }
}