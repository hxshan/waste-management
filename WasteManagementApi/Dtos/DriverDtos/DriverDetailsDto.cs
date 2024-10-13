using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Dtos.DriverDtos
{
    public class DriverDetailsDto
    {
        public string Id {get;set;}
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

         public int? TruckId { get; set; }
        public Truck? Truck {get;set;}

        public bool IsActive { get; set; }

    }
}