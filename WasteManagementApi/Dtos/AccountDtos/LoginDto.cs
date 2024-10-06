using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class LoginDto
    {
        [Required]
        public String Email { get; set; }

        [Required]
        public String Password { get; set; }
    }
}
