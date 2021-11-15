using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto
{
    public static class Extensions
    {
        public static AssetDto AsDto(this Asset asset)
        {
            return new AssetDto
            {
                AssetId = asset.AssetId,
                AssetName = asset.AssetName,
                Ticker = asset.Ticker
            };
        }
    }
}