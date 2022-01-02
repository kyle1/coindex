using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class SectionCategory
    {
        public SectionCategory()
        {
            AssetSections = new HashSet<AssetSection>();
        }

        public int SectionCategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int SortOrder { get; set; }

        public virtual ICollection<AssetSection> AssetSections { get; set; }
    }
}
