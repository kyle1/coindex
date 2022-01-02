using System.Collections.Generic;
using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetSectionsRepository
    {
        List<SectionCategory> GetSectionCategories();
        SectionCategory GetSectionCategory(int id);
        void CreateSectionCategory(SectionCategory category);
        void UpdateSectionCategory(SectionCategory updatedcategory);
        AssetSection GetAssetSection(int id);
        void CreateAssetSection(AssetSection section);
        void UpdateAssetSection(AssetSection updatedSection);
    }
}