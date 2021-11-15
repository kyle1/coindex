namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record CreateAssetDto
    {
        public string AssetName { get; set; }
        public string Ticker { get; set; }
    }
}