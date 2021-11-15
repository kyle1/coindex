namespace Crypto.Entities
{
    //TODO: Look further into class vs record
    public record Asset
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public string Ticker { get; set; }
    }
}