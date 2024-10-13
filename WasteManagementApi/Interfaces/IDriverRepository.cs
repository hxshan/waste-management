using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface IDriverRepository
    {
        Task<List<Driver>> GetDriversAsync();
    }
}