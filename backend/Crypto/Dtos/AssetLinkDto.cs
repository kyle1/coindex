namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetLinkDto
    {
        public int AssetLinkId { get; init; }
        public int AssetId { get; init; }
        public string Url { get; init; }
        public string Description { get; init; }
    }
}