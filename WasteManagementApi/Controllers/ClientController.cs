using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WasteManagementApi.Dtos.clientDtos;
using WasteManagementApi.Dtos.CollectionDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Mappers;
using WasteManagementApi.Models;

namespace WasteManagementApi.Controllers
{
    [Route("api/client")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _clientRepository;

        public ClientController(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            var clients = await _clientRepository.GetAllClientsAsync();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDetailsDto>> GetClient(String id)
        {
            var client = await _clientRepository.GetClientByIdAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(ClientMapper.MapClientToClientDto(client));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(String id, ClientUpdateDto clientDto)
        {
           
            try
            {
                await _clientRepository.UpdateClientAsync(id,clientDto);
            }
            catch (Exception)
            {
                if (!await ClientExists(id))
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

        [HttpPost("collection-request/{userid}")]
        public async Task<IActionResult> CreateCollectionRequest(string userid,NormalRequestDto requestDto){
            
            try{

            var collectionRequest = new NormalRequest{
                ClientId=requestDto.ClientId,
                ScheduleDate=requestDto.ScheduleDate,
                Status="pending",
                BinId=requestDto.BinId
            };
            
            }catch(Exception ex){
                Problem("Internal Server Error");
            }
            
            return Ok();
        }

        private async Task<bool> ClientExists(String id)
        {
            var client = await _clientRepository.GetClientByIdAsync(id);
            return client != null;
        }
    }
}
