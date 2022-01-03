using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetTag
    {
        public AssetTag()
        {
            AssetTagXrefs = new HashSet<AssetTagXref>();
        }

        public int AssetTagId { get; set; }
        public string TagName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<AssetTagXref> AssetTagXrefs { get; set; }
    }
}
