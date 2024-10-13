using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Dtos.AccountDtos
{
    public class ClientRegisterDto:RegisterDto
    {
        public float? AddressLongitude { get; set; }
        public float? AddressLatitude{ get; set; }
    }
}