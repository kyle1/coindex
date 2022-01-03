namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetSectionDto
    {
        public int AssetSectionId { get; init; }
        public int AssetId { get; init;}
        public int SectionCategoryId { get; init; }
        public string Body { get; init; }
        public int? Rating { get; init; }
        
        public SectionCategoryDto SectionCategory { get; init; }
    }
}