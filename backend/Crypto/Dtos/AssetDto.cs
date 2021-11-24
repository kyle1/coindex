namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetDto
    {
        public int AssetId { get; init; }
        public string AssetName { get; init; }
        public string Ticker { get; init; }
    }
}