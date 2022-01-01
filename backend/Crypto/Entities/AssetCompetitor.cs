using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetCompetitor
    {
        public int AssetTagXrefId { get; set; }
        public int AssetId { get; set; }
        public int CompetitorAssetId { get; set; }

        public virtual Asset Asset { get; set; }
        public virtual AssetTag CompetitorAsset { get; set; }
    }
}
