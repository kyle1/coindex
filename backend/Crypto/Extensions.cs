using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;

namespace Crypto
{
    public static class Extensions
    {
        public static ResourceGroupDto AsDto(this ResourceGroup group)
        {
            return new ResourceGroupDto
            {
                ResourceGroupId = group.ResourceGroupId,
                GroupName = group.GroupName,
                Description = group.Description,
            };
        }

        public static ResourceDto AsDto(this Resource resource)
        {
            return new ResourceDto
            {
                ResourceId = resource.ResourceId,
                ResourceName = resource.ResourceName,
                ResourceGroupId = resource.ResourceGroupId,
                Url = resource.Url,
                Description = resource.Description,
                ResourceGroup = resource.ResourceGroup != null ? resource.ResourceGroup.AsDto() : null
            };
        }

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

        public static AssetTagXrefDto AsDto(this AssetTagXref xref)
        {
            return new AssetTagXrefDto
            {
                AssetTagXrefId = xref.AssetTagXrefId,
                AssetId = xref.AssetId,
                AssetTagId = xref.AssetTagId
            };
        }

        public static AssetSectionDto AsDto(this AssetSection section)
        {
            return new AssetSectionDto
            {
                AssetSectionId = section.AssetSectionId,
                AssetId = section.AssetId,
                Body = section.Body,
                Rating = section.Rating,
                SectionCategory = section.SectionCategory != null ? section.SectionCategory.AsDto() : null
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