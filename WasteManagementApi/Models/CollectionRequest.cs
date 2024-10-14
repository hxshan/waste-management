using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class CollectionRequest
    {
        public int Id { get; set; }
        public string ClientId { get; set; }
        public Client? Client{get;set;}
        public DateTime ScheduleDate { get; set; }
        public string Status { get; set; }
        public string? Location { get; set; }
        public float? LocationLongitude{get;set;}
        public float? LocationLatitude{get;set;}
        

    }
}