namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record SectionEntryDto
    {
        public int SectionEntryId { get; init; }
        public int AssetId { get; init;}
        public int SectionId { get; init; }
        public string Body { get; init; }
        public int? Rating { get; init; }
        
        public AssetDto Asset { get; init; }
        public SectionDto Section { get; init; }
    }
}