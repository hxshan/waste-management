using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Models;
using WasteManagementApi.Mappers;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Dtos.CollectionDtos;
using System.Security.Claims;

namespace WasteManagementApi.Controllers
{
    [Route("api/special-request")]
    [ApiController]
    public class SpecialRequestController : ControllerBase
    {
        private readonly ISpecialRequestRepository _repository;


        public SpecialRequestController(ISpecialRequestRepository repository)
        {
            _repository = repository;

        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateSpecialRequest(string id, SpecialRequestDto specialRequestDto)
        {
            try
            {
                var specialRequest = SpecialRequestMapper.MapSpecialRequestDtoToSpecialRequest(specialRequestDto);
                var createdRequest = await _repository.CreateAsync(specialRequest);
                return CreatedAtAction(nameof(CreateSpecialRequest), new { id = createdRequest.Id }, createdRequest);
            }
            catch (Exception e)
            {

                return Problem("Error When Creating Special Request");
            }






        }



        [HttpGet("user/{clientId}")]
        public async Task<IActionResult> GetUserSpecialRequests(string clientId)
        {
            try
            {

                var specialRequests = await _repository.GetByUserIdAsync(clientId);
                return Ok(specialRequests);
            }
            catch (Exception e)
            {
                return Problem("Error in create Client Special Requests");
            }




        }

        [HttpGet("{requestId}")]
        public async Task<IActionResult> GetSpecialRequest(int requestId)
        {
            try
            {
                var specialRequest = await _repository.GetByIdAsync(requestId);
                if (specialRequest == null)
                {
                    return NotFound();
                }
                return Ok(specialRequest);

            }
            catch (Exception e)
            {
                return Problem("Error in Retriving Client Special Request by request id");
            }

        }


        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<SpecialRequest>>> GetAllSpecialReqests()
        {
            try
            {
                var specialRequests = await _repository.GetAllAsync();
                return Ok(specialRequests);
            }
            catch (Exception e)
            {
                return Problem("Error in Retriving Client Special Request");
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSpecialRequest(int id, SpecialRequestDto specialRequestDto)
        {
            var existingRequest = await _repository.GetByIdAsync(id);
            if (existingRequest == null)
            {
                return NotFound();
            }

            SpecialRequestMapper.UpdateSpecialRequestFromDto(existingRequest, specialRequestDto);

            var updatedRequest = await _repository.UpdateAsync(existingRequest);
            return Ok(updatedRequest);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialRequest(int id)
        {
            var existingRequest = await _repository.GetByIdAsync(id);
            if (existingRequest == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(id);
            return NoContent();
        }

    }
}