using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class ResourceGroup
    {
        public ResourceGroup()
        {
            Resources = new HashSet<Resource>();
        }

        public int ResourceGroupId { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Resource> Resources { get; set; }
    }
}
