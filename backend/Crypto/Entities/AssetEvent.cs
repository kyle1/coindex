using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetEvent
    {
        public int AssetTagXrefId { get; set; }
        public string EventName { get; set; }
        public int AssetId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Notes { get; set; }
        public bool IsConfirmed { get; set; }
        public bool IsStarred { get; set; }

        public virtual Asset Asset { get; set; }
    }
}
