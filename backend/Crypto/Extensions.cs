using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto
{
    public static class Extensions
    {
        public static AssetDto AsDto(this Asset asset)
        {
            //var tags = asset.AssetTagXrefs.ToList().Select(x => x.AssetTag).ToList();

            return new AssetDto
            {
                AssetId = asset.AssetId,
                AssetName = asset.AssetName,
                Ticker = asset.Ticker,
                Website = asset.Website,
                Subreddit = asset.Subreddit,
                Tags = asset.AssetTagXrefs.ToList().Select(x => x.AssetTag.AsDto()).ToList(),
                Sections = asset.AssetSections.Select(x => x.AsDto()).ToList()
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

        public static AssetSectionDto AsDto(this AssetSection section)
        {
            return new AssetSectionDto
            {
                AssetSectionId = section.AssetSectionId,
                Title = section.Title,
                Body = section.Body,
                SortOrder = section.SortOrder
            };
        }
    }
}