using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crypto.Repositories
{
    public class AssetTagsRepository : IAssetTagsRepository
    {
        public IEnumerable<AssetTag> GetAssetTags()
        {
            var context = new CryptoDbContext();
            var tags = context.AssetTags.ToList();
            return tags;
        }

        public AssetTag GetAssetTag(int id)
        {
            var context = new CryptoDbContext();
            var tag = context.AssetTags.SingleOrDefault(tag => tag.AssetTagId == id);
            return tag;
        }

        public void CreateAssetTag(AssetTag tag)
        {
            var context = new CryptoDbContext();
            context.AssetTags.Add(tag);
            context.SaveChanges();
        }

        public void UpdateAssetTag(AssetTag updatedTag)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.AssetSections.Add(updatedSection);
            context.Entry(updatedTag).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void DeleteAssetTag(int id)
        {
            // var index = tags.FindIndex(existingTag => existingTag.AssetTagId == id);
            // tags.RemoveAt(index);
        }
    }
}