using Crypto.Dtos;
using Crypto.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("sections")]
    public class AssetSectionsController : ControllerBase
    {
        private readonly IAssetSectionsRepository repository;

        public AssetSectionsController(IAssetSectionsRepository repository)
        {
            this.repository = repository;
        }
        
        [HttpPost]
        public ActionResult CreateAssetSection(int id, AssetSectionDto sectionDto)
        {
            // var existingSection = repository.GetAssetSection(id);

            // if (existingSection is null)
            // {
            //     return NotFound();
            // }

            // AssetTag updatedTag = existingTag with {
            //     TagName = tagDto.TagName,
            //     Description = tagDto.Description
            // };

            // repository.UpdateAssetTag(updatedTag);

            

            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateAssetSection(int id, AssetSectionDto sectionDto)
        {
            // var existingSection = repository.GetAssetSection(id);

            // if (existingSection is null)
            // {
            //     return NotFound();
            // }

            // AssetTag updatedTag = existingTag with {
            //     TagName = tagDto.TagName,
            //     Description = tagDto.Description
            // };

            // repository.UpdateAssetTag(updatedTag);

            repository.UpdateAssetSection(sectionDto);

            return NoContent();
        }
    }
}