namespace WasteManagementApi.Dtos.AccountDtos
{
    public class NewUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        public string Token { get; set; }
        public string Role { get; set; }
    }
}
