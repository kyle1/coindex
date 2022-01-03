using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetSection
    {
        public int AssetSectionId { get; set; }
        public int AssetId { get; set; }
        public int SectionCategoryId { get; set; }
        public string Body { get; set; }
        public int? Rating { get; set; }

        public virtual Asset Asset { get; set; }
        public virtual SectionCategory SectionCategory { get; set; }
    }
}
