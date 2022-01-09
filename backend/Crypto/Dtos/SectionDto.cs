namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record SectionDto
    {
        public int SectionId { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public int SortOrder { get; init; }
    }
}