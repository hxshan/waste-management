using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Dtos.CollectionDtos
{
    public class NormalRequestDto
    {
        public string ClientId { get; set; }
        public string  WasteType { get; set; }
        public DateTime ScheduleDate { get; set; }
        public int? BinId {get;set;}
    }
}