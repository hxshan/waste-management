using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Dtos.clientDtos
{
    public class ClientDetailsDto
    {
         public string FirstName { get; set; }

         public string? MiddleName { get; set; }
         
        public string LastName { get; set; }

        public string Email { get; set; }

        public string NIC { get; set; }
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public float? AddressLongitude { get; set; }
        public float? AddressLatitude{ get; set; }
    }
}