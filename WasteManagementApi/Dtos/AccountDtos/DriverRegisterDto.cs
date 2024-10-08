using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class DriverRegisterDto:RegisterDto
    {
       
        public string? EmergencyContact { get; set; }

        public string Address { get; set; }

        public DateTime? DateOfHire { get; set; }
        public DateTime? DateOfResignation { get; set; }

        public bool IsActive { get; set; }

        public decimal? Salary { get; set; }

        public string? Department { get; set; }

        public string LicenseNumber { get; set; }
        public string LicenceType { get; set; }
        public DateTime LicenceExpiration { get; set; }
    }
}
