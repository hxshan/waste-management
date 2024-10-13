using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class CollectionRequest
    {
        public String requestId { get; set; }
        public String UserId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public String Status { get; set; }
        public String Location { get; set; }

    }
}