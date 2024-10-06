using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class RegisterDriverDto
    {

        [Required]
        public String? FirstName { get; set; } 
        public String? MiddleName { get; set; }

        [Required]
        public String? LastName { get; set; }

        [Required]
        public String? NIC { get; set; }

        [Required]
        [EmailAddress]
        public String? Email { get; set; }

        [Required]
        public String? Password { get; set; }

    }
}
