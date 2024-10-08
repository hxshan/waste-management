using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; }

        public string? MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string NIC { get; set; }
    }
}
