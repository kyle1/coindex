namespace Crypto.Entities
{
    //TODO: Look further into class vs record
    public record AssetTag
    {
        public int AssetTagId { get; init; }
        public string TagName { get; init; }
        public string Description { get; init; }
        public int AssetTagCategoryId { get; init; }
    }
}