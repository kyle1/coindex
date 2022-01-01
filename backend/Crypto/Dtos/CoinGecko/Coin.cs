namespace Crypto.Dtos.CoinGecko
{
    //Reference: https://www.coingecko.com/en/api/documentation
    //TODO: Look further into class vs record
    public record Coin
    {
        public string symbol { get; init; }
        public string name { get; init; }
        public decimal current_price { get; init; }
        public long market_cap { get; init; }
        public int market_cap_rank { get; init; }
        public long total_volume { get; init; }
        //public decimal price_change_percentage_24h { get; init; }
        public decimal? price_change_percentage_1h_in_currency { get; init; }
        public decimal? price_change_percentage_24h_in_currency { get; init; }
        public decimal? price_change_percentage_7d_in_currency { get; init; }
        public decimal? price_change_percentage_30d_in_currency { get; init; }
        public decimal? price_change_percentage_1y_in_currency { get; init; }
    }
}