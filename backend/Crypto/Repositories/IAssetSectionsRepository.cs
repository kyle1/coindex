using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetSectionsRepository
    {
        AssetSection GetAssetSection(int id);
        void UpdateAssetSection(AssetSectionDto updatedSection);
    }
}