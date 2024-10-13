using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using WasteManagementApi.Interfaces;

namespace WasteManagementApi.Models
{
    public class HelperStaff:User
    {
        
        public string? EmergencyContact { get; set; }

        public DateTime? DateOfHire { get; set; }
        public DateTime? DateOfResignation { get; set; }

        public bool IsActive { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }

        public string? Department { get; set; }
        public int? TruckId {get;set;}
        public Truck Truck {get;set;}
    }
}
