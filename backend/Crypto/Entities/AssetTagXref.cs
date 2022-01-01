using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetTagXref
    {
        public int AssetTagXrefId { get; set; }
        public int AssetId { get; set; }
        public int AssetTagId { get; set; }

        public virtual Asset Asset { get; set; }
        public virtual AssetTag AssetTag { get; set; }
    }
}
