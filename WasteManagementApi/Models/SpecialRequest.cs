using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class SpecialRequest:CollectionRequest
    {
        public String WasteType { get; set; }
        public String? Quantity { get; set; }
        public String? Description { get; set; }
        public string ContactNo { get; internal set; }
        public string SpecialInstructions { get; internal set; }
    }
}