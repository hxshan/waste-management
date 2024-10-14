using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasteManagementApi.Dtos;
using WasteManagementApi.Models;

namespace WasteManagementApi.Mappers
{
    public static class BinMapper
    {
        public static BinDtos ToDTO(this Bin bin)
        {
            return new BinDtos
            {
                Id = bin.Id,
                ClientId = bin.ClientId,
                Location = bin.Location,
                MaxWasteCap = bin.MaxWasteCap,
                CurrentWasteLevel = bin.CurrentWasteLevel,
                Status = bin.Status,
                BinType = bin.BinType
            };
        }

        public static Bin ToEntity(this BinDtos binDTO)
        {
            return new Bin
            {
                Id = binDTO.Id,
                ClientId = binDTO.ClientId,
                Location = binDTO.Location,
                MaxWasteCap = binDTO.MaxWasteCap,
                CurrentWasteLevel = binDTO.CurrentWasteLevel,
                Status = binDTO.Status,
                BinType = binDTO.BinType
            };
        }
    }
}