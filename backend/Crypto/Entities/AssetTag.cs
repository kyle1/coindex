using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetTag
    {
        public AssetTag()
        {
            AssetCompetitors = new HashSet<AssetCompetitor>();
            AssetTagXrefs = new HashSet<AssetTagXref>();
        }

        public int AssetTagId { get; set; }
        public string TagName { get; set; }
        public string Description { get; set; }
        public int? AssetTagCategoryId { get; set; }

        public virtual AssetTagCategory AssetTagCategory { get; set; }
        public virtual ICollection<AssetCompetitor> AssetCompetitors { get; set; }
        public virtual ICollection<AssetTagXref> AssetTagXrefs { get; set; }
    }
}
