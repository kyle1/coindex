namespace Crypto.Entities
{
    //TODO: Look further into class vs record
    public record Asset
    {
        public int AssetId { get; init; }
        public string AssetName { get; init; }
        public string Ticker { get; init; }
        public string Website { get; init; }
        public string Subreddit { get; init; }
    }
}