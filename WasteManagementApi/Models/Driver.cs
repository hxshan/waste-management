using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Models
{
    public class Driver : User
    {
        public String? FirstName { get; set; }

        public String? MiddleName { get; set; }

        public String? LastName { get; set; }

        public String? NIC { get; set; }

        public string EmergencyContact { get; set; }

        public string Address { get; set; }

        public string LicenseNumber { get; set; }
    }
}
