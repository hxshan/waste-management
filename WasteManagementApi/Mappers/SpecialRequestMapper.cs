using WasteManagementApi.Dtos.CollectionDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public static class SpecialRequestMapper
    {

        public static SpecialRequest MapSpecialRequestDtoToSpecialRequest(SpecialRequestDto specialRequest)
        {
            return new SpecialRequest
            {
                ClientId = specialRequest.UserId,
                ScheduleDate = specialRequest.ScheduleDate,
                Location = specialRequest.Location,
                WasteType = specialRequest.WasteType,
                Status = "pending",
                Quantity = specialRequest.Quantity,
                Description = specialRequest.Description,
                ContactNo = specialRequest.ContactNo,
                SpecialInstructions = specialRequest.SpecialInstructions,
            };

        }
    }
}
