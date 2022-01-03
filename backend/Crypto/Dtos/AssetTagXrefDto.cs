namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetTagXrefDto
    {
        public int AssetTagXrefId { get; init; }
        public int AssetId { get; init; }
        public int AssetTagId { get; init; }
    }
}