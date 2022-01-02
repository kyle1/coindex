using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;
using Crypto.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("tags")]
    public class AssetTagsController : ControllerBase
    {
        private readonly IAssetTagsRepository repository;

        public AssetTagsController(IAssetTagsRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IEnumerable<AssetTagDto> GetAssetTags()
        {
            var tags = repository.GetAssetTags().Select(tag => tag.AsDto());

            return tags;
        }

        [HttpGet("{id}")]
        public ActionResult<AssetTagDto> GetAssetTag(int id)
        {
            var tag = repository.GetAssetTag(id);

            if (tag is null)
            {
                return NotFound();
            }

            return tag.AsDto();
        }

        [HttpPost]
        public ActionResult<AssetTagDto> CreateAssetTag(AssetTagDto tagDto)
        {
            AssetTag tag = new()
            {
                AssetTagId = 0,
                TagName = tagDto.TagName,
                Description = tagDto.Description
            };

            repository.CreateAssetTag(tag);

            return CreatedAtAction(nameof(GetAssetTag), new { id = tag.AssetTagId }, tag.AsDto());
        }
        
        [HttpPut("{id}")]
        public ActionResult UpdateAssetTag(int id, AssetTagDto tagDto)
        {
            var existingTag = repository.GetAssetTag(id);

            if (existingTag is null)
            {
                return NotFound();
            }

            // AssetTag updatedTag = existingTag with {
            //     TagName = tagDto.TagName,
            //     Description = tagDto.Description
            // };

            var updatedTag = new AssetTag
            {
                AssetTagId = tagDto.AssetTagId,
                TagName = tagDto.TagName,
                Description = tagDto.Description,
            };

            repository.UpdateAssetTag(updatedTag);

            // repository.UpdateAssetTag(updatedTag);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAssetTag(int id)
        {
            var existingTag = repository.GetAssetTag(id);
            
            if (existingTag is null)
            {
                return NotFound();
            }

            repository.DeleteAssetTag(id);

            return NoContent();
        }
    }
}