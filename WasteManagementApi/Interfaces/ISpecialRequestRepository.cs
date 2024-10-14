using System.Collections.Generic;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface ISpecialRequestRepository
    {
        Task<SpecialRequest> CreateAsync(SpecialRequest specialRequest);
        Task<IEnumerable<SpecialRequest>> GetByUserIdAsync(string userId);
        Task<SpecialRequest> GetByIdAsync(string id);
        Task<IEnumerable<SpecialRequest>> GetAllAsync();
        Task<SpecialRequest> UpdateAsync(SpecialRequest specialRequest);
        Task DeleteAsync(string id);
    }
}