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
    public class SectionsController : ControllerBase
    {
        private readonly ISectionsRepository repository;

        public SectionsController(ISectionsRepository repository) => this.repository = repository;

        [HttpGet]
        public ActionResult<List<SectionDto>> GetSections()
        {
            var sections = repository.GetSections();
            var sectionDtos = sections.Select(x => x.AsDto()).ToList();
            return sectionDtos;
        }

        [HttpGet("{id}")]
        public ActionResult<SectionDto> GetSection(int id)
        {
            var section = repository.GetSection(id);
            if (section is null) return NotFound();
            return section.AsDto();
        }

        [HttpPost]
        public ActionResult CreateSection(int id, SectionDto sectionDto)
        {
            Section section = new()
            {
                SectionId = 0,
                Title = sectionDto.Title,
                Description = sectionDto.Description,
                SortOrder = sectionDto.SortOrder
            };
            repository.CreateSection(section);
            return CreatedAtAction(nameof(GetSection), new { id = section.SectionId }, section.AsDto());
        }

        [HttpPut("{id}")]
        public ActionResult UpdateSection(int id, SectionDto sectionDto)
        {
            var existingSection = repository.GetSection(id);
            if (existingSection is null) return NotFound();
            var updatedSection = new Section
            {
                SectionId = sectionDto.SectionId,
                Title = sectionDto.Title,
                Description = sectionDto.Description,
                SortOrder = sectionDto.SortOrder
            };
            repository.UpdateSection(updatedSection);
            return NoContent();
        }
        
        [HttpGet("entries/{id}")]
        public ActionResult<SectionEntryDto> GetSectionEntry(int id)
        {
            var entry = repository.GetSectionEntry(id);
            var entryDto = entry.AsDto();
            return entryDto;
        }

        [HttpPost("entries")]
        public ActionResult CreateSectionEntry(int id, SectionEntryDto entryDto)
        {
            SectionEntry entry = new()
            {
                AssetId = entryDto.AssetId,
                SectionId = entryDto.SectionId,
                Body = entryDto.Body,
                Rating = entryDto.Rating
            };
            repository.CreateSectionEntry(entry);
            return CreatedAtAction(nameof(GetSectionEntry), new { id = entry.SectionEntryId }, entry.AsDto());
        }

        [HttpPut("entries/{id}")]
        public ActionResult UpdateSectionEntry(int id, SectionEntryDto entryDto)
        {
            // var existingSection = repository.GetAssetSection(id);

            // if (existingSection is null) return NotFound();

            // var updatedSection = new AssetSection
            // {
            //     AssetSectionId = sectionDto.AssetSectionId,
            //     AssetId = sectionDto.AssetId,
            //     SectionCategoryId = sectionDto.SectionCategoryId,
            //     Body = sectionDto.Body,
            //     Rating = sectionDto.Rating
            // };

            var entry = repository.GetSectionEntry(id);
            if (entry is null) return NotFound();
            entry.SectionEntryId = entryDto.SectionEntryId;
            entry.AssetId = entryDto.AssetId;
            entry.SectionId = entryDto.SectionId;
            entry.Body = entryDto.Body;
            entry.Rating = entryDto.Rating;
            repository.UpdateSectionEntry(entry);
            return NoContent();
        }
    }
}