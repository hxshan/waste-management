using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Dtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Mappers;

namespace WasteManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinsController : ControllerBase
    {
        private readonly IBinRepository _binRepository;

        public BinsController(IBinRepository binRepository)
        {
            _binRepository = binRepository;
        }

        // GET: api/Bins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinDtos>>> GetBins()
        {
            var bins = await _binRepository.GetAllBinsAsync();
            return Ok(bins.Select(b => b.ToDTO()));
        }

        // GET: api/Bins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BinDtos>> GetBin(int id)
        {
            var bin = await _binRepository.GetBinByIdAsync(id);

            if (bin == null)
            {
                return NotFound();
            }

            return bin.ToDTO();
        }

        [HttpGet("client/{id}")]
        public async Task<ActionResult<List<BinDtos>>> GetBinsByClientId(string id)
        {
            var bin = await _binRepository.GetBinsByClientIdAsync(id);

            if (bin == null)
            {
                return NotFound();
            }

           var bins = bin.Select(b => b.ToDTO()).ToList();


            return bins;
        }

        // POST: api/Bins
        [HttpPost]
        public async Task<ActionResult<BinDtos>> PostBin(BinDtos binDTO)
        {
            var bin = binDTO.ToEntity();
            await _binRepository.CreateBinAsync(bin);

            return CreatedAtAction(nameof(GetBin), new { id = bin.Id }, bin.ToDTO());
        }

        // PUT: api/Bins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBin(int id, BinDtos binDTO)
        {
            if (id != binDTO.Id)
            {
                return BadRequest();
            }

            var bin = binDTO.ToEntity();

            try
            {
                await _binRepository.UpdateBinAsync(bin);
            }
            catch (Exception)
            {
                if (!await BinExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Bins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBin(int id)
        {
            var bin = await _binRepository.GetBinByIdAsync(id);
            if (bin == null)
            {
                return NotFound();
            }

            await _binRepository.DeleteBinAsync(id);

            return NoContent();
        }

        private async Task<bool> BinExists(int id)
        {
            var bin = await _binRepository.GetBinByIdAsync(id);
            return bin != null;
        }
}
}