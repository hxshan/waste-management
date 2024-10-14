using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WasteManagementApi.Data;
using WasteManagementApi.Dtos.clientDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly ApplicationDbContext _context;

        public ClientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Client>> GetAllClientsAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client> GetClientByIdAsync(String id)
        {
            return await _context.Users.OfType<Client>().FirstOrDefaultAsync(u => u.Id ==id);
        }


        public async Task<bool> DeleteClientAsync(String id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return false;

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}