using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetSection
    {
        public int AssetSectionId { get; set; }
        public int AssetId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int SortOrder { get; set; }

        public virtual Asset Asset { get; set; }
    }
}
