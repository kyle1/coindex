using System.ComponentModel.DataAnnotations;

namespace Crypto.Dtos
{
    //TODO: Look further into class vs record
    public record CreateAssetDto
    {
        [Required]
        public string AssetName { get; init; }
        [Required]
        public string Ticker { get; init; }
    }
}