using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public class AssetTagsRepository : IAssetTagsRepository
    {
        private readonly List<AssetTag> tags = new()
        {
            new AssetTag { AssetTagId = 1, TagName = "Layer-1", Description = "Layer-1" },
            new AssetTag { AssetTagId = 2, TagName = "Layer-2", Description = "Layer-2" },
            new AssetTag { AssetTagId = 3, TagName = "Meme", Description = "Meme" },
        };

        public IEnumerable<AssetTag> GetAssetTags()
        {
            return tags;
        }

        public AssetTag GetAssetTag(int id)
        {
            return tags.SingleOrDefault(tag => tag.AssetTagId == id);
        }

        public void CreateAssetTag(AssetTag tag)
        {
            tags.Add(tag);
        }

        public void UpdateAssetTag(AssetTag tag)
        {
            var index = tags.FindIndex(existingTag => existingTag.AssetTagId == tag.AssetTagId);
            tags[index] = tag;
        }

        public void DeleteAssetTag(int id)
        {
            var index = tags.FindIndex(existingTag => existingTag.AssetTagId == id);
            tags.RemoveAt(index);
        }
    }
}