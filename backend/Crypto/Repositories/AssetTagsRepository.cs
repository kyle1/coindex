using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;

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
            //tags.Add(tag);
        }

        public void UpdateAssetTag(AssetTag tag)
        {
            // var index = tags.FindIndex(existingTag => existingTag.AssetTagId == tag.AssetTagId);
            // tags[index] = tag;
        }

        public void DeleteAssetTag(int id)
        {
            // var index = tags.FindIndex(existingTag => existingTag.AssetTagId == id);
            // tags.RemoveAt(index);
        }
    }
}