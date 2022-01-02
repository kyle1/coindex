using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using Crypto.Dtos.CoinGecko;
using Crypto.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crypto.Repositories
{
    public class AssetsRepository : IAssetsRepository
    {

        public IEnumerable<Asset> GetAssets()
        {
            var context = new CryptoDbContext();
            var assets = context.Assets.ToList();
            return assets;
        }

        public Asset GetAsset(int id)
        {
            var context = new CryptoDbContext();
            var asset = context.Assets
                .Include(x => x.AssetTagXrefs)
                .ThenInclude(x => x.AssetTag)
                .Include(x => x.AssetSections)
                    .ThenInclude(x => x.SectionCategory)
                    // .OrderBy(x => x.AssetSections.Select(x => x.SectionCategory.SortOrder))
                .Include(x => x.AssetLinks)
                .SingleOrDefault(asset => asset.AssetId == id);

            // Not sure how to order the sections in the query above. This will handle it for now.
            asset.AssetSections = asset.AssetSections.OrderBy(x => x.SectionCategory.SortOrder).ToList();

            return asset;
        }

        public void CreateAsset(Asset asset)
        {
            var context = new CryptoDbContext();
            context.Assets.Add(asset);
            context.SaveChanges();
        }

        public void UpdateAsset(Asset updatedAsset)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            //context.Assets.Add(updatedAsset);
            context.Entry(updatedAsset).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void DeleteAsset(int id)
        {
            // var index = assets.FindIndex(existingAsset => existingAsset.AssetId == id);
            // assets.RemoveAt(index);
        }

        public IEnumerable<Coin> GetCoinGeckoCoins()
        {
            var baseUrl = "https://api.coingecko.com/";
            var client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var path = "api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y";
            var response = client.GetAsync(path).GetAwaiter().GetResult();
            var coinsJson = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            var coins = JsonSerializer.Deserialize<List<Coin>>(coinsJson);

            return coins;
        }
    }
}