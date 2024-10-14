using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Dtos.clientDtos
{
    public class ClientUpdateDto
    {
          public string FirstName { get; set; }

         public string? MiddleName { get; set; }
         
        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}