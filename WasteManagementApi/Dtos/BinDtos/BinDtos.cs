using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WasteManagementApi.Dtos
{
    public class BinDtos
    {
        public int Id { get; set; }
        public string ClientId { get; set; }
        public string Location { get; set; }
        public float MaxWasteCap { get; set; }
        public float CurrentWasteLevel { get; set; }
        public string Status { get; set; }
        public string BinType { get; set; }
        
    }
}