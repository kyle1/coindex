using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetLink
    {
        public int AssetLinkId { get; set; }
        public int AssetId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }

        public virtual Asset Asset { get; set; }
    }
}
