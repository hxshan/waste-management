using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class NormalRequest: CollectionRequest
    {
        public int? BinId{get;set;}
        public Bin? Bin {get;set;}
        public string  WasteType { get; set; }

    }
}