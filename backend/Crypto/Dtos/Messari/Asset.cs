namespace Crypto.Dtos.Messari
{
    //TODO: Look further into class vs record
    public record Asset
    {
        public string Symbol { get; init; }
        public string Name { get; init; }
    }
}