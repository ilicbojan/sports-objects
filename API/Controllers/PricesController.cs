using System.Threading.Tasks;
using Application.Prices.Commands.CreatePrice;
using Application.Prices.Commands.DeletePrice;
using Application.Prices.Commands.UpdatePrice;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin + "," + RolesEnum.Client)]
    [Route("api/sport-objects")]
    public class PricesController : ApiController
    {
        [HttpPost("{sportObjectId}/prices")]
        public async Task<ActionResult<int>> Create(int sportObjectId, CreatePriceCommand command)
        {
            command.SportObjectId = sportObjectId;

            return await Mediator.Send(command);
        }

        [HttpPut("{sportObjectId}/prices/{priceId}")]
        public async Task<ActionResult<Unit>> Update(int sportObjectId, int priceId, UpdatePriceCommand command)
        {
            command.SportObjectId = sportObjectId;
            command.PriceId = priceId;

            return await Mediator.Send(command);
        }

        [HttpDelete("{sportObjectId}/prices/{priceId}")]
        public async Task<ActionResult<Unit>> Delete(int sportObjectId, int priceId)
        {
            return await Mediator.Send(new DeletePriceCommand { SportObjectId = sportObjectId, PriceId = priceId });
        }
    }
}