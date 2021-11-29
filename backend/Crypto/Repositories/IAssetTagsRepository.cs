using System.Collections.Generic;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetTagsRepository
    {
        AssetTag GetAssetTag(int id);
        IEnumerable<AssetTag> GetAssetTags();
        void CreateAssetTag(AssetTag tag);
        void UpdateAssetTag(AssetTag tag);
        void DeleteAssetTag(int id);
    }
}