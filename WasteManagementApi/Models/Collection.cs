using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WasteManagementApi.Models
{
    public class Collection
    {
        public int Id {get;set;}
        public int RequestId {get;set;}
        public CollectionRequest CollectionRequest {get;set;}
        public DateTime CollectionDate {get;set;} 
        public int TruckId {get;set;} 
        public bool Status {get;set;} 
        public int DriverId {get;set;}
        public Driver Driver {get;set;}    
        public List<int> CrewMemberIds{get;set;}
        public List<HelperStaff> CrewMembers{get;set;}
    }
}