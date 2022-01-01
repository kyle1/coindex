using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class PortfolioAsset
    {
        public int PortfolioAssetId { get; set; }
        public int AssetId { get; set; }
        public decimal Quantity { get; set; }
        public decimal? PriceTarget { get; set; }
        public string BuyReason { get; set; }
        public string SellReason { get; set; }
        public decimal? ConvictionRating { get; set; }
        public string HoldLength { get; set; }
        public string Notes { get; set; }

        public virtual Asset Asset { get; set; }
    }
}
