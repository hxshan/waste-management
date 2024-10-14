using System.ComponentModel.DataAnnotations;

namespace WasteManagementApi.Dtos.CollectionDtos 
{
    public class SpecialRequestDto{
        public string UserId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public string Location { get; set; }
        public string WasteType { get; set; }
        public string Quantity { get; set; }
        public string Description { get; set; }
        public string ContactNo { get; set; }
        public string SpecialInstructions { get; set; }
    }

}