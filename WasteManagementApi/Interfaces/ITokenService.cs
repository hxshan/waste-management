using Microsoft.AspNetCore.Identity;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface ITokenService
    {
         Task<String> CreateToken(User user);
    }
}
