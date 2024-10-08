using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class HelperRegisterDto:RegisterDto
    {

        public string? EmergencyContact { get; set; }

        public DateTime? DateOfHire { get; set; }
        public DateTime? DateOfResignation { get; set; }

        public bool IsActive { get; set; }

        public decimal? Salary { get; set; }

        public string? Department { get; set; }
        
    }
}