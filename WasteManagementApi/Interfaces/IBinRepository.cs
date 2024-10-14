using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface IBinRepository
    {
        Task<IEnumerable<Bin>> GetAllBinsAsync();
        Task<Bin> GetBinByIdAsync(int id);
        Task<Bin> CreateBinAsync(Bin bin);
        Task UpdateBinAsync(Bin bin);
        Task DeleteBinAsync(int id);
    }
}