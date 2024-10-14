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

        [HttpPost]
        public async Task<IActionResult> CreateSpecialRequest(SpecialRequestDto specialRequestDto)
        {
            
                var specialRequest = SpecialRequestMapper.MapSpecialRequestDtoToSpecialRequest(specialRequestDto);
                var createdRequest = await _repository.CreateAsync(specialRequest);
                return CreatedAtAction(nameof(GetSpecialRequest), new { id = createdRequest.Id }, createdRequest);
            
            

        }



        [HttpGet("/user/{clientId}")]
        public async Task<IActionResult> GetUserSpecialRequests(string clientId)
        {
            try
            {

                var specialRequests = await _repository.GetByUserIdAsync(clientId);
                return Ok(specialRequests);
            }
            catch (Exception e)
            {
                return Problem("Error in Retriving Client Special Requests");
            }




        }

        [HttpGet("/{requestId}")]
        public async Task<IActionResult> GetSpecialRequest(string requestId)
        {
            var specialRequest = await _repository.GetByIdAsync(requestId);
            if (specialRequest == null)
            {
                return NotFound();
            }
            return Ok(specialRequest);
        }

        // Implement other CRUD operations as needed
    }
}