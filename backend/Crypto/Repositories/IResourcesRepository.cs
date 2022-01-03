using System.Collections.Generic;
using Crypto.Entities;

namespace Crypto.Repositories
{
    public interface IResourcesRepository
    {
        IEnumerable<ResourceGroup> GetResourceGroups();
        ResourceGroup GetResourceGroup(int id);
        IEnumerable<Resource> GetResources();
        Resource GetResource(int id);
        void CreateResourceGroup(ResourceGroup group);
        void CreateResource(Resource resource);
        void UpdateResourceGroup(ResourceGroup updatedGroup);
        void UpdateResource(Resource updatedResource);
        void DeleteResourceGroup(int id);
        void DeleteResource(int id);
    }
}