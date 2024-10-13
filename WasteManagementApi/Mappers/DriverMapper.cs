using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Dtos.DriverDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public class DriverMapper
    {
        public static DriverDetailsDto MapDriverToDriverDetailsDto(Driver driver)
        {
            return new DriverDetailsDto
            {
                Id = driver.Id,
                FirstName = driver.FirstName,
                LastName = driver.LastName,
                PhoneNumber = driver.PhoneNumber,
                Truck = driver.Truck,
                TruckId = driver.TruckId,
                IsActive = driver.IsActive,

            };

        }




    }
}