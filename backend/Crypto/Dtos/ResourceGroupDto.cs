namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record ResourceGroupDto
    {
        public int ResourceGroupId { get; init; }
        public string GroupName { get; init; }
        public string Description { get; init; }

    }
}