namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record SectionCategoryDto
    {
        public int SectionCategoryId { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public int SortOrder { get; init; }
    }
}