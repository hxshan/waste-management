using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class Bin
    {
    public int BinId { get; set; }        // Unique identifier for the bin
    public string CusId { get; set; }        // Customer ID related to the bin
    public string Location { get; set; }  // Location of the bin
    public float MaxWasteCap { get; set; }  // Maximum waste capacity of the bin
    public float CurrentWasteLevel { get; set; }  // Current waste level in the bin
    public string Status { get; set; }    // Status of the bin (e.g., Full, Empty)
    public string BinType { get; set; }   // Type of the bin (e.g., Recycling, General Waste)

    }
}