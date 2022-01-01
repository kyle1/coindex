namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record AssetSectionDto
    {
        public int AssetSectionId { get; init; }
        public string Title { get; init; }
        public string Body { get; init; }
        public int SortOrder { get; init; }
    }
}