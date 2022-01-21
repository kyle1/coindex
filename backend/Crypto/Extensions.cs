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
                ShowInDashboard = resource.ShowInDashboard,
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
                SectionEntries = asset.SectionEntries.Select(x => x.AsDto()).ToList(),
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

        public static SectionEntryDto AsDto(this SectionEntry entry)
        {
            return new SectionEntryDto
            {
                SectionEntryId = entry.SectionEntryId,
                AssetId = entry.AssetId,
                Body = entry.Body,
                Rating = entry.Rating,
                Section = entry.Section != null ? entry.Section.AsDto() : null
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

        public static AssetTransactionDto AsDto(this AssetTransaction transaction)
        {
            return new AssetTransactionDto
            {
                AssetTransactionId = transaction.AssetTransactionId,
                AssetId = transaction.AssetId,
                TransactionDate = transaction.TransactionDate,
                TransactionType = transaction.TransactionType,
                Quantity = transaction.Quantity,
                AssetPrice = transaction.AssetPrice,
                Platform = transaction.Platform
            };
        }

        public static SectionDto AsDto(this Section section)
        {
            return new SectionDto
            {
                SectionId = section.SectionId,
                Title = section.Title,
                Description = section.Description,
                SortOrder = section.SortOrder
            };
        }
    }
}