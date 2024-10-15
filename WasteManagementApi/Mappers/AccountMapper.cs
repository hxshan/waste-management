using WasteManagementApi.Dtos.AccountDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public static class AccountMapper
    {

        public static Driver MapDriverRegisterToDriver(DriverRegisterDto registerDto)
        {
            return new Driver
            {
                UserName = registerDto.FirstName + registerDto.LastName,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                MiddleName = registerDto.MiddleName,
                LastName = registerDto.LastName,
                NIC = registerDto.NIC,
                EmergencyContact = registerDto.EmergencyContact,
                Address = registerDto.Address,
                PhoneNumber = registerDto.PhoneNumber,
                DateOfHire = registerDto.DateOfHire,
                DateOfResignation = null,
                IsActive = registerDto.IsActive,
                Salary =  registerDto.Salary,
                Department = registerDto.Department,
                LicenseNumber = registerDto.LicenseNumber,
                LicenceType = registerDto.LicenceType,
                LicenceExpiration = registerDto.LicenceExpiration,
            };

        }
        public static HelperStaff MapHelperRegisterToHelper(HelperRegisterDto registerDto)
        {
            return new HelperStaff
            {
                UserName = registerDto.FirstName + registerDto.LastName,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                MiddleName = registerDto.MiddleName,
                LastName = registerDto.LastName,
                NIC = registerDto.NIC,
                EmergencyContact = registerDto.EmergencyContact,
                Address = registerDto.Address,
                PhoneNumber = registerDto.PhoneNumber,
                DateOfHire = registerDto.DateOfHire,
                DateOfResignation = null,
                IsActive = registerDto.IsActive,
                Salary =  registerDto.Salary,
                Department = registerDto.Department,
            };

        }
        public static AdminStaff MapAdminRegisterToAdmin(AdminRegisterDto registerDto)
        {
            return new AdminStaff
            {
                UserName = registerDto.FirstName + registerDto.LastName,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                MiddleName = registerDto.MiddleName,
                LastName = registerDto.LastName,
                NIC = registerDto.NIC,
                EmergencyContact = registerDto.EmergencyContact,
                Address = registerDto.Address,
                PhoneNumber = registerDto.PhoneNumber,
                DateOfHire = registerDto.DateOfHire,
                DateOfResignation = null,
                IsActive = registerDto.IsActive,
                Salary =  registerDto.Salary,
                Department = registerDto.Department,
            };

        }
        public static Client MapClientRegisterToClient(ClientRegisterDto registerDto)
        {
            return new Client
            {
                UserName = registerDto.FirstName + registerDto.LastName,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                MiddleName = registerDto.MiddleName,
                LastName = registerDto.LastName,
                NIC = registerDto.NIC,
                Address = registerDto.Address,
                AddressLatitude = registerDto.AddressLatitude,
                AddressLongitude = registerDto.AddressLongitude,
                PhoneNumber = registerDto.PhoneNumber,
               
            };

        }

    }
}
