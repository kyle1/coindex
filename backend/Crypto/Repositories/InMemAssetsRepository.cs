using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public class InMemAssetsRepository //: IAssetsRepository
    {
        private readonly List<Asset> assets = new()
        {
            new Asset { AssetId = 1, AssetName = "Bitcoin", Ticker = "BTC", Website = "https://bitcoin.org", Subreddit = "r/Bitcoin" },
            new Asset { AssetId = 2, AssetName = "Ethereum", Ticker = "ETH", Website = "https://ethereum.org", Subreddit = "r/ethereum" },
            new Asset { AssetId = 3, AssetName = "Algorand", Ticker = "ALGO", Website = "https://www.algorand.com/", Subreddit = "r/AlgorandOfficial" },
            new Asset { AssetId = 4, AssetName = "Loopring", Ticker = "LRC", Website = "https://loopring.org/", Subreddit = "r/loopringorg" },
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

        public void UpdateAsset(Asset asset)
        {
            var index = assets.FindIndex(existingAsset => existingAsset.AssetId == asset.AssetId);
            assets[index] = asset;
        }

        public void DeleteAsset(int id)
        {
            var index = assets.FindIndex(existingAsset => existingAsset.AssetId == id);
            assets.RemoveAt(index);
        }
    }
}