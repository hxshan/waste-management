using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Models;
using WasteManagementApi.Mappers;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Dtos.CollectionDtos;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialRequest(string id)
        {
            var specialRequest = await _repository.GetByIdAsync(id);
            if (specialRequest == null)
            {
                return NotFound();
            }
            return Ok(specialRequest);
        }

        // Implement other CRUD operations as needed
    }
}