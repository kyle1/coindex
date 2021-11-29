using System.Collections.Generic;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetsRepository
    {
        Asset GetAsset(int id);
        IEnumerable<Asset> GetAssets();
        void CreateAsset(Asset asset);
        void UpdateAsset(Asset asset);
        void DeleteAsset(int id);
    }
}