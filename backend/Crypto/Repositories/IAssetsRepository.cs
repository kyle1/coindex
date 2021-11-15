using System.Collections.Generic;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetRepository
    {
        Asset GetAsset(int id);
        IEnumerable<Asset> GetAssets();
        void CreateAsset(Asset asset);
    }
}