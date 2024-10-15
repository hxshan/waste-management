using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WasteManagementApi.Controllers;
using WasteManagementApi.Dtos.clientDtos;
using WasteManagementApi.Dtos.CollectionDtos;
using WasteManagementApi.Interfaces;
using WasteManagementApi.Models;

namespace WasteManagementApi.Tests.Controller
{
    public class ClientControllerTests
    {
        private readonly ClientController _controller;
        private readonly IClientRepository _clientRepo;
        private readonly INormalRequestRepository _normalReqRepo;

        public ClientControllerTests()
        {
            _clientRepo = A.Fake<IClientRepository>();
            _normalReqRepo = A.Fake<INormalRequestRepository>();
            _controller = new ClientController(_clientRepo, _normalReqRepo);

        }

        [Fact]
        public async Task GetAllClients_ReturnsOkResult()
        {

            var clients = new List<Client?>
            {
                new Client
                {

                Id = "client1",
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                NIC = "NIC123456",
                PhoneNumber = "555-1234",
                Address = "123 Main St, Springfield",
                Email = "johndoe@example.com",
                PasswordHash = "sadasdadasdadasdasdasdaswefwefwe",
                },
                 new Client
                {

                Id = "client2",
                FirstName = "John",
                MiddleName = "A.",
                LastName = "Doe",
                NIC = "NIC123456",
                PhoneNumber = "555-1234",
                Address = "123 Main St, Springfield",
                Email = "johndoe@example.com",
                 PasswordHash = "sadasdadasdadasdasdasdaswefwefwe",
                }


            };

            A.CallTo(() => _clientRepo.GetAllClientsAsync()).Returns(clients);

            var result = await _controller.GetAllClients();

            result.Should().BeOfType<OkObjectResult>();

        }

        [Fact]
        public async Task GetClient_ReturnsNotFound()
        {
            
            A.CallTo(() => _clientRepo.GetClientByIdAsync("invalid_id")).Returns(Task.FromResult<Client>(null));

            var result = await _controller.GetClient("invalid_id");

            result.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task CreateCollectionRequest_ReturnsOk()
        {
           
            var requestDto = new NormalRequestDto
            {
                BinId = 1,
                ScheduleDate = DateTime.Now
            };

            var collectionRequest = new NormalRequest
            {
                ClientId = "client1",
                ScheduleDate = requestDto.ScheduleDate,
                Status = "pending",
                BinId = requestDto.BinId
            };

            A.CallTo(() => _normalReqRepo.CreateNormalRequest(collectionRequest)).Returns(Task.FromResult<NormalRequest>(collectionRequest));
   

            var result = await _controller.CreateCollectionRequest("client1", requestDto);

         
            result.Should().BeOfType<OkObjectResult>()
                .Which.Value.Should().Be("Request Created Successfully");
        }

        [Fact]
        public async Task CreateCollectionRequest_ReturnsProblem()
        {
            
            var requestDto = new NormalRequestDto { BinId = 1, ScheduleDate = DateTime.Now };
            A.CallTo(() => _normalReqRepo.CreateNormalRequest(A<NormalRequest>.Ignored)).Throws(new Exception());

            var result = await _controller.CreateCollectionRequest("client1", requestDto);

            result.Should().BeOfType<ObjectResult>()
                .Which.StatusCode.Should().Be(500);
        }

    }
}
