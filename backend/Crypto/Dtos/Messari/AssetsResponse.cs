namespace Crypto.Dtos.Messari
{
    //TODO: Look further into class vs record
    public record AssetsResponse
    {
        public AssetsData Data { get; init; }
    }
}