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
            
                var specialRequest = SpecialRequestMapper.MapSpecialRequestDtoToSpecialRequest(specialRequestDto);
                var createdRequest = await _repository.CreateAsync(specialRequest);
                return CreatedAtAction(nameof(CreateSpecialRequest), new { id = createdRequest.Id }, createdRequest);
            
            

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
                return Problem("Error in Retriving Client Special Requests");
            }




        }

        [HttpGet("{requestId}")]
        public async Task<IActionResult> GetSpecialRequest(string requestId)
        {
            var specialRequest = await _repository.GetByIdAsync(requestId);
            if (specialRequest == null)
            {
                return NotFound();
            }
            return Ok(specialRequest);
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<SpecialRequest>>> GetAllSpecialReqests()
        {
            var specialRequests = await _repository.GetAllAsync();
            return Ok(specialRequests);
        }
    }
}