using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Dtos.AccountDtos;
using WasteManagementApi.Dtos.clientDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public static class ClientMapper
    {
         public static ClientDetailsDto MapClientToClientDto(Client client)
        {
            return new ClientDetailsDto
            {
                FirstName = client.FirstName,
                MiddleName = client.MiddleName,
                LastName = client.LastName,
                NIC = client.NIC,
                Address = client.Address,
                AddressLatitude = client.AddressLatitude,
                AddressLongitude = client.AddressLongitude,
                PhoneNumber = client.PhoneNumber,
               
            };

        }

    }
}