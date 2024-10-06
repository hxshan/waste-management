using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class RegisterDto
    {
        [Required]
        public String? UserName { get; set; }

        [Required]
        [EmailAddress]
        public String? Email { get; set; }

        [Required]
        public String? Password { get; set; }
    }
}
