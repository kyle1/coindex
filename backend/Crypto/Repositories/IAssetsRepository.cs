using System.Collections.Generic;
using Crypto.Dtos.CoinGecko;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IAssetsRepository
    {
        Asset GetAsset(int id);
        IEnumerable<Asset> GetAssets();
        IEnumerable<Coin> GetCoinGeckoCoins();
        void CreateAsset(Asset asset);
        void SaveAssetTagXref(AssetTagXref xref);
        void UpdateAsset(Asset updatedAsset);
        void DeleteAsset(Asset asset);
        void DeleteAssetTagXref(AssetTagXref xref);
    }
}