using System.Collections.Generic;

namespace Crypto.Dtos.Messari
{
    //TODO: Look further into class vs record
    public record AssetsData
    {
        public List<Asset> Assets { get; init; }
    }
}