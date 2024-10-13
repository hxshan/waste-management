using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class SpecialRequest:CollectionRequest
    {
        public string WasteType { get; set; }
        public string? Quantity { get; set; }
        public string? Description { get; set; }

    }
}