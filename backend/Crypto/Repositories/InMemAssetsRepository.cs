using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public class InMemAssetsRepository : IAssetRepository
    {
        private readonly List<Asset> assets = new()
        {
            new Asset { AssetId = 1, AssetName = "Bitcoin", Ticker = "BTC" },
            new Asset { AssetId = 2, AssetName = "Ethereum", Ticker = "ETH" },
            new Asset { AssetId = 3, AssetName = "Loopring", Ticker = "LRC" },
        };

        public IEnumerable<Asset> GetAssets()
        {
            return assets;
        }

        public Asset GetAsset(int id)
        {
            return assets.SingleOrDefault(asset => asset.AssetId == id);
        }

        public void CreateAsset(Asset asset)
        {
            assets.Add(asset);
        }
    }
}