using System.Collections.Generic;
using System.Linq;
using Crypto.Dtos;
using Crypto.Entities;
using Crypto.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crypto.Controllers
{
    [ApiController]
    [Route("sections")]
    public class AssetSectionsController : ControllerBase
    {
        private readonly IAssetSectionsRepository repository;

        public AssetSectionsController(IAssetSectionsRepository repository) => this.repository = repository;

        [HttpGet("categories")]
        public ActionResult<List<SectionCategoryDto>> GetSectionCategories()
        {
            var categories = repository.GetSectionCategories();
            var categoryDtos = categories.Select(x => x.AsDto()).ToList();
            return categoryDtos;
        }

        [HttpGet("categories/{id}")]
        public ActionResult<SectionCategoryDto> GetSectionCategory(int id)
        {
            var category = repository.GetSectionCategory(id);
            if (category is null) return NotFound();
            return category.AsDto();
        }

        [HttpPost("category")]
        
        public ActionResult CreateSectionCategory(int id, SectionCategoryDto categoryDto)
        {
            SectionCategory category = new()
            {
                SectionCategoryId = 0,
                Title = categoryDto.Title,
                Description = categoryDto.Description,
                SortOrder = categoryDto.SortOrder
            };

            repository.CreateSectionCategory(category);

            return CreatedAtAction(nameof(GetSectionCategory), new { id = category.SectionCategoryId }, category.AsDto());
        }

        [HttpPut("category/{id}")]
        public ActionResult UpdateSectionCategory(int id, SectionCategoryDto sectionDto)
        {
            var existingCategory = repository.GetSectionCategory(id);

            if (existingCategory is null) return NotFound();

            var updatedCategory = new SectionCategory
            {
                SectionCategoryId = sectionDto.SectionCategoryId,
                Title = sectionDto.Title,
                Description = sectionDto.Description,
                SortOrder = sectionDto.SortOrder
            };

            repository.UpdateSectionCategory(updatedCategory);

            return NoContent();
        }
        
        [HttpPost]
        public ActionResult CreateAssetSection(int id, AssetSectionDto sectionDto)
        {
            AssetSection section = new()
            {
                AssetId = sectionDto.AssetId,
                SectionCategoryId = sectionDto.SectionCategoryId,
                Body = sectionDto.Body,
                Rating = sectionDto.Rating
            };

            repository.CreateAssetSection(section);

            return CreatedAtAction(nameof(GetSectionCategory), new { id = section.SectionCategoryId }, section.AsDto());
        }

        [HttpPut("{id}")]
        public ActionResult UpdateAssetSection(int id, AssetSectionDto sectionDto)
        {
            var existingSection = repository.GetAssetSection(id);

            if (existingSection is null) return NotFound();

            var updatedSection = new AssetSection
            {
                AssetSectionId = sectionDto.AssetSectionId,
                AssetId = sectionDto.AssetId,
                SectionCategoryId = sectionDto.SectionCategoryId,
                Body = sectionDto.Body,
                Rating = sectionDto.Rating
            };

            repository.UpdateAssetSection(updatedSection);

            return NoContent();
        }
    }
}