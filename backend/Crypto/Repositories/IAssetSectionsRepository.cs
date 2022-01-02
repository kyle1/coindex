using System.Collections.Generic;
using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetSectionsRepository
    {
        List<SectionCategory> GetSectionCategories();
        AssetSection GetAssetSection(int id);
        void UpdateAssetSection(AssetSectionDto updatedSection);
    }
}