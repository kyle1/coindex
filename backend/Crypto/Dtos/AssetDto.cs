namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetDto
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; }
        public string Ticker { get; set; }
    }
}