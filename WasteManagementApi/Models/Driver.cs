using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WasteManagementApi.Interfaces;

namespace WasteManagementApi.Models
{
    public class Driver : User
    {
       
        public string? EmergencyContact { get; set; }
        public DateTime? DateOfHire { get; set; }
        public DateTime? DateOfResignation { get; set; }
        public bool IsActive { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? Salary { get; set; }
        public string? Department { get; set; }
        public string LicenseNumber { get; set; }
        public string LicenceType { get; set; }
        public DateTime LicenceExpiration { get; set; }

        public int? TruckId { get; set; }
        public Truck? Truck {get;set;}
        public float AssignedAreaLat { get; set; }
        public float AssignedAreaLng { get; set; }
        public float AssignedAreaRadius { get; set; } 

         public ICollection<Collection>? Collections { get; set; }
    }
}
