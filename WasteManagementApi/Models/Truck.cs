using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class Truck
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; }
        public string TruckModel { get; set; }
        public Driver Driver { get; set; }
        public ICollection<HelperStaff> HelperStaff { get; set; }
    }
}