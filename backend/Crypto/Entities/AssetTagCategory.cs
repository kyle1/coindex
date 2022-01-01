using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetTagCategory
    {
        public AssetTagCategory()
        {
            AssetTags = new HashSet<AssetTag>();
        }

        public int AssetTagCategoryId { get; set; }
        public string Description { get; set; }

        public virtual ICollection<AssetTag> AssetTags { get; set; }
    }
}
