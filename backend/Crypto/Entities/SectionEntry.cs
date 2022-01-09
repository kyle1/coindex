using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class SectionEntry
    {
        public int SectionEntryId { get; set; }
        public int AssetId { get; set; }
        public int SectionId { get; set; }
        public string Body { get; set; }
        public int? Rating { get; set; }

        public virtual Asset Asset { get; set; }
        public virtual Section Section { get; set; }
    }
}
