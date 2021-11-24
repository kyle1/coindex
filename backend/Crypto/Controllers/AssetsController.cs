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
        private readonly IAssetRepository repository;

        public AssetsController(IAssetRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<AssetDto> GetAssets()
        {
            var assets = repository.GetAssets().Select(asset => asset.AsDto());

            return assets;
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
                Ticker = assetDto.Ticker
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

            Asset updatedAsset = existingAsset with {
                AssetName = assetDto.AssetName,
                Ticker = assetDto.Ticker
            };

            repository.UpdateAsset(updatedAsset);

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