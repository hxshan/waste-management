using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class UserLoginDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public string Token { get; set; }
        public string Role { get; set; }
    }
}