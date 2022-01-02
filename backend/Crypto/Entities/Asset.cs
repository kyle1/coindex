﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class Asset
    {
        public Asset()
        {
            AssetCompetitors = new HashSet<AssetCompetitor>();
            AssetEvents = new HashSet<AssetEvent>();
            AssetLinks = new HashSet<AssetLink>();
            AssetSections = new HashSet<AssetSection>();
            AssetTagXrefs = new HashSet<AssetTagXref>();
            PortfolioAssets = new HashSet<PortfolioAsset>();
        }

        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public string Ticker { get; set; }
        public string Website { get; set; }
        public string Subreddit { get; set; }

        public virtual ICollection<AssetCompetitor> AssetCompetitors { get; set; }
        public virtual ICollection<AssetEvent> AssetEvents { get; set; }
        public virtual ICollection<AssetLink> AssetLinks { get; set; }
        public virtual ICollection<AssetSection> AssetSections { get; set; }
        public virtual ICollection<AssetTagXref> AssetTagXrefs { get; set; }
        public virtual ICollection<PortfolioAsset> PortfolioAssets { get; set; }
    }
}
