using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Models;

namespace WasteManagementApi.Interfaces
{
    public interface INormalRequestRepository
    {
        Task<NormalRequest> CreateNormalRequest(NormalRequest normalRequest);
        Task<List<NormalRequest>> GetRequestsByClientId(string clientId);
        Task<List<NormalRequest>> GetAllRequests();
       
    }
}