using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class Resource
    {
        public int ResourceId { get; set; }
        public string ResourceName { get; set; }
        public int ResourceGroupId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public bool ShowInDashboard { get; set; }

        public virtual ResourceGroup ResourceGroup { get; set; }
    }
}
