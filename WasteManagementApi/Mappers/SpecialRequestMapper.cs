using WasteManagementApi.Dtos.CollectionDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public static class SpecialRequestMapper
    {

        public static SpecialRequest MapDriverRegisterToDriver(SpecialRequestDto specialRequest)
        {
            return new SpecialRequest
            {
                UserId = specialRequest.UserId,
                ScheduleDate = specialRequest.ScheduleDate,
                Location = specialRequest.Location,
                WasteType = specialRequest.WasteType,
                Quantity = specialRequest.Quantity,
                Description = specialRequest.Description,
                ContactNo = specialRequest.ContactNo,
                SpecialInstructions = specialRequest.SpecialInstructions,
            };

        }
    }
}
