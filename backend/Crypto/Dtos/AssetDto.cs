using System.Collections.Generic;

namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetDto
    {
        public int AssetId { get; init; }
        public string AssetName { get; init; }
        public string Ticker { get; init; }
        public string Website { get; init; }
        public string Subreddit { get; init; }
        public decimal CurrentPrice { get; set; }
        public long MarketCap { get; set; }
        public int MarketCapRank { get; set; }
        public long TotalVolume { get; set; }
        public decimal? PriceChangePercentage1h { get; set; }
        public decimal? PriceChangePercentage24h { get; set; }
        public decimal? PriceChangePercentage7d { get; set; }
        public decimal? PriceChangePercentage30d { get; set; }
        public decimal? PriceChangePercentage1y { get; set; }
        public List<AssetTagDto> Tags { get; set; }
        //TODO: Consider renaming classes to "AssetSection" and "AssetSectionEntry"
        //public List<SectionCategoryDto> SectionCategories { get; set; }
        public List<SectionEntryDto> SectionEntries { get; set; }
        public List<AssetLinkDto> Links { get; set; }
    }
}