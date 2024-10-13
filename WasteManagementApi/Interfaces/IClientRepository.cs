using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Dtos.clientDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface IClientRepository
    {
        Task<List<Client>> GetAllClientsAsync();
        Task<Client> GetClientByIdAsync(String id);
        Task<Client> UpdateClientAsync(String id,ClientUpdateDto client);
        Task<bool> DeleteClientAsync(String id);
    }
}