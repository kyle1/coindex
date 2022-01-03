using System.Collections.Generic;
using System.Linq;
using Crypto.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crypto.Repositories
{
    public class ResourcesRepository : IResourcesRepository
    {
        public IEnumerable<ResourceGroup> GetResourceGroups()
        {
            var context = new CryptoDbContext();
            var groups = context.ResourceGroups.ToList();
            return groups;
        }

        public ResourceGroup GetResourceGroup(int id)
        {
            var context = new CryptoDbContext();
            var group = context.ResourceGroups.SingleOrDefault(x => x.ResourceGroupId == id);
            return group;
        }

        public IEnumerable<Resource> GetResources()
        {
            var context = new CryptoDbContext();
            var resources = context.Resources.Include(x => x.ResourceGroup).ToList();
            return resources;
        }

        public Resource GetResource(int id)
        {
            var context = new CryptoDbContext();
            var resource = context.Resources.SingleOrDefault(x => x.ResourceId == id);
            return resource;
        }

        public void CreateResourceGroup(ResourceGroup group)
        {
            var context = new CryptoDbContext();
            context.ResourceGroups.Add(group);
            context.SaveChanges();
        }

        public void CreateResource(Resource resource)
        {
            var context = new CryptoDbContext();
            context.Resources.Add(resource);
            context.SaveChanges();
        }

        public void UpdateResourceGroup(ResourceGroup updatedGroup)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.AssetSections.Add(updatedSection);
            context.Entry(updatedGroup).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void UpdateResource(Resource updatedResource)
        {
            //TODO: Test if this works.
            var context = new CryptoDbContext();
            // context.AssetSections.Add(updatedSection);
            context.Entry(updatedResource).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void DeleteResourceGroup(int id)
        {
            //TODO
        }

        public void DeleteResource(int id)
        {
            //TODO
        }
    }
}