using System;

namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetTransactionDto
    {
        public int AssetTransactionId { get; init; }
        public int AssetId { get; init; }
        public DateTime TransactionDate { get; init; }
        public string TransactionType { get; init; }
        public decimal Quantity { get; init; }
        public decimal AssetPrice { get; init; }
        public string Platform { get; init; }

        public AssetDto Asset { get; init; }
    }
}