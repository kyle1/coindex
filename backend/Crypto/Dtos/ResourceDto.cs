namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record ResourceDto
    {
        public int ResourceId { get; init; }
        public int ResourceGroupId { get; init; }
        public string ResourceName { get; init; }
        public string Url { get; init; }
        public string Description { get; init; }
        public bool ShowInDashboard { get; init; }

        public ResourceGroupDto ResourceGroup { get; init; }
    }
}