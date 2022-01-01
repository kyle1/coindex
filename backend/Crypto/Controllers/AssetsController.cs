using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;
using Crypto.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("assets")]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetsRepository repository;

        public AssetsController(IAssetsRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<AssetDto> GetAssets()
        {
            var assets = repository.GetAssets().Select(asset => asset.AsDto()).ToList();

            var coins = repository.GetCoinGeckoCoins();

            foreach (var asset in assets)
            {
                var coin = coins.SingleOrDefault(x => x.symbol.ToUpper() == asset.Ticker.ToUpper());

                if (coin != null)
                {
                    asset.CurrentPrice = coin.current_price;
                    asset.MarketCap = coin.market_cap;
                    asset.MarketCapRank = coin.market_cap_rank;
                    asset.TotalVolume = coin.total_volume;
                    asset.PriceChangePercentage1h = coin.price_change_percentage_1h_in_currency;
                    asset.PriceChangePercentage24h = coin.price_change_percentage_24h_in_currency;
                    asset.PriceChangePercentage7d = coin.price_change_percentage_7d_in_currency;
                    asset.PriceChangePercentage30d = coin.price_change_percentage_30d_in_currency;
                    asset.PriceChangePercentage1y = coin.price_change_percentage_1y_in_currency;
                }
            }

            return assets.OrderBy(x => x.MarketCapRank);
        }

        [HttpGet("{id}")]
        public ActionResult<AssetDto> GetAsset(int id)
        {
            var asset = repository.GetAsset(id);

            if (asset is null)
            {
                return NotFound();
            }

            return asset.AsDto();
        }

        [HttpPost]
        public ActionResult<AssetDto> CreateAsset(CreateAssetDto assetDto)
        {
            Asset asset = new()
            {
                AssetId = 1,
                AssetName = assetDto.AssetName,
                Ticker = assetDto.Ticker,
                Website = assetDto.Website,
                Subreddit = assetDto.Subreddit
            };

            repository.CreateAsset(asset);

            return CreatedAtAction(nameof(GetAsset), new { id = asset.AssetId }, asset.AsDto());
        }
        
        [HttpPut("{id}")]
        public ActionResult UpdateAsset(int id, UpdateAssetDto assetDto)
        {
            var existingAsset = repository.GetAsset(id);

            if (existingAsset is null)
            {
                return NotFound();
            }

            // Asset updatedAsset = existingAsset with {
            //     AssetName = assetDto.AssetName,
            //     Ticker = assetDto.Ticker,
            //     Website = assetDto.Website,
            //     Subreddit = assetDto.Subreddit
            // };

            // repository.UpdateAsset(updatedAsset);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAsset(int id)
        {
            var existingAsset = repository.GetAsset(id);
            
            if (existingAsset is null)
            {
                return NotFound();
            }

            repository.DeleteAsset(id);

            return NoContent();
        }
    }
}