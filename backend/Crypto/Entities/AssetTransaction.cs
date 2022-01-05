using System;
using System.Collections.Generic;

#nullable disable

namespace Crypto.Entities
{
    public partial class AssetTransaction
    {
        public int AssetTransactionId { get; set; }
        public int AssetId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
        public decimal Quantity { get; set; }
        public decimal AssetPrice { get; set; }
        public string Platform { get; set; }

        public virtual Asset Asset { get; set; }
    }
}
