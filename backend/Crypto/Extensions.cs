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
                Ticker = asset.Ticker,
                Website = asset.Website,
                Subreddit = asset.Subreddit
            };
        }

        public static AssetTagDto AsDto(this AssetTag tag)
        {
            return new AssetTagDto
            {
                AssetTagId = tag.AssetTagId,
                TagName = tag.TagName,
                Description = tag.Description
            };
        }
    }
}