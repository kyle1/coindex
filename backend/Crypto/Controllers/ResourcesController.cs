using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;
using Crypto.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("resources")]
    public class ResourcesController : ControllerBase
    {
        private readonly IResourcesRepository repository;

        public ResourcesController(IResourcesRepository repository) => this.repository = repository;

        [HttpGet("groups")]
        public IEnumerable<ResourceGroupDto> GetResourceGroups()
        {
            var groups = repository.GetResourceGroups().Select(x => x.AsDto());
            return groups;
        }

        [HttpGet("groups/{id}")]
        public ActionResult<ResourceGroupDto> GetResourceGroup(int id)
        {
            var group = repository.GetResourceGroup(id);
            if (group is null) return NotFound();
            return group.AsDto();
        }

        [HttpGet]
        public IEnumerable<ResourceDto> GetResources()
        {
            var resources = repository.GetResources().Select(x => x.AsDto());
            return resources;
        }

        [HttpGet("{id}")]
        public ActionResult<ResourceDto> GetResource(int id)
        {
            var resource = repository.GetResource(id);
            if (resource is null) return NotFound();
            return resource.AsDto();
        }

        [HttpPost("groups")]
        public ActionResult<AssetTagDto> CreateResourceGroup(ResourceGroupDto groupDto)
        {
            ResourceGroup group = new()
            {
                ResourceGroupId = groupDto.ResourceGroupId,
                GroupName = groupDto.GroupName,
                Description = groupDto.Description
            };
            repository.CreateResourceGroup(group);
            return CreatedAtAction(nameof(GetResourceGroup), new { id = group.ResourceGroupId }, group.AsDto());
        }

        [HttpPost]
        public ActionResult<ResourceDto> CreateResource(ResourceDto resourceDto)
        {
            Resource resource = new()
            {
                ResourceId = 0,
                ResourceGroupId = resourceDto.ResourceGroupId,
                ResourceName = resourceDto.ResourceName,
                Url = resourceDto.Url,
                Description = resourceDto.Description
            };
            repository.CreateResource(resource);
            return CreatedAtAction(nameof(GetResource), new { id = resource.ResourceId }, resource.AsDto());
        }
        
        [HttpPut("groups/{id}")]
        public ActionResult UpdateResourceGroup(int id, ResourceGroupDto groupDto)
        {
            var existingGroup = repository.GetResourceGroup(id);
            if (existingGroup is null) return NotFound();
            // AssetTag updatedTag = existingTag with {
            //     TagName = tagDto.TagName,
            //     Description = tagDto.Description
            // };
            var updatedGroup = new ResourceGroup
            {
                ResourceGroupId = groupDto.ResourceGroupId,
                GroupName = groupDto.GroupName,
                Description = groupDto.Description
            };
            repository.UpdateResourceGroup(updatedGroup);
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateResource(int id, ResourceDto resourceDto)
        {
            var existingResource = repository.GetResource(id);
            if (existingResource is null) return NotFound();
            // AssetTag updatedTag = existingTag with {
            //     TagName = tagDto.TagName,
            //     Description = tagDto.Description
            // };
            var updatedResource = new Resource
            {
                ResourceId = resourceDto.ResourceId,
                ResourceName = resourceDto.ResourceName,
                ResourceGroupId = resourceDto.ResourceGroupId,
                Url = resourceDto.Url,
                Description = resourceDto.Description
            };
            repository.UpdateResource(updatedResource);
            return NoContent();
        }

        [HttpDelete("groups/{id}")]
        public ActionResult DeleteResourceGroup(int id)
        {
            var existingGroup = repository.GetResourceGroup(id);
            if (existingGroup is null) return NotFound();
            repository.DeleteResourceGroup(id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteResource(int id)
        {
            var existingResource = repository.GetResource(id);
            if (existingResource is null) return NotFound();
            repository.DeleteResource(id);
            return NoContent();
        }
    }
}