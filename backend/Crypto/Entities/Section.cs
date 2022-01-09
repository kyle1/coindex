using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class Section
    {
        public Section()
        {
            SectionEntries = new HashSet<SectionEntry>();
        }

        public int SectionId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int SortOrder { get; set; }

        public virtual ICollection<SectionEntry> SectionEntries { get; set; }
    }
}
