using WasteManagementApi.Dtos.CollectionDtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public static class SpecialRequestMapper
    {
        public static SpecialRequest MapSpecialRequestDtoToSpecialRequest(SpecialRequestDto specialRequestDto)
        {
            return new SpecialRequest
            {
                ClientId = specialRequestDto.UserId,
                ScheduleDate = specialRequestDto.ScheduleDate,
                Location = specialRequestDto.Location,
                WasteType = specialRequestDto.WasteType,
                Status = "pending",
                Quantity = specialRequestDto.Quantity,
                Description = specialRequestDto.Description,
                ContactNo = specialRequestDto.ContactNo,
                SpecialInstructions = specialRequestDto.SpecialInstructions,
            };
        }

        public static void UpdateSpecialRequestFromDto(SpecialRequest existingRequest, SpecialRequestDto specialRequestDto)
        {
            existingRequest.ClientId = specialRequestDto.UserId;
            existingRequest.ScheduleDate = specialRequestDto.ScheduleDate;
            existingRequest.Location = specialRequestDto.Location;
            existingRequest.WasteType = specialRequestDto.WasteType;
            existingRequest.Quantity = specialRequestDto.Quantity;
            existingRequest.Description = specialRequestDto.Description;
            existingRequest.ContactNo = specialRequestDto.ContactNo;
            existingRequest.SpecialInstructions = specialRequestDto.SpecialInstructions;

            // Note: We don't update the Status here as it might be managed separately
        }

        public static SpecialRequestDto MapSpecialRequestToDto(SpecialRequest specialRequest)
        {
            return new SpecialRequestDto
            {
                UserId = specialRequest.ClientId,
                ScheduleDate = specialRequest.ScheduleDate,
                Location = specialRequest.Location,
                WasteType = specialRequest.WasteType,
                Quantity = specialRequest.Quantity,
                Description = specialRequest.Description,
                ContactNo = specialRequest.ContactNo,
                SpecialInstructions = specialRequest.SpecialInstructions,
                // Include Status in DTO if needed
            };
        }
    }
}