using System.Linq;
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
                Subreddit = asset.Subreddit,
                Tags = asset.AssetTagXrefs.ToList().Select(x => x.AssetTag.AsDto()).ToList(),
                Sections = asset.AssetSections.Select(x => x.AsDto()).ToList(),
                Links = asset.AssetLinks.Select(x => x.AsDto()).ToList()
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
                SectionCategory = section.SectionCategory.AsDto(),
                Body = section.Body,
            };
        }

        public static AssetLinkDto AsDto(this AssetLink link)
        {
            return new AssetLinkDto
            {
                AssetLinkId = link.AssetLinkId,
                Url = link.Url,
                Description = link.Description
            };
        }

        public static SectionCategoryDto AsDto(this SectionCategory category)
        {
            return new SectionCategoryDto
            {
                SectionCategoryId = category.SectionCategoryId,
                Title = category.Title,
                Description = category.Description,
                SortOrder = category.SortOrder
            };
        }
    }
}