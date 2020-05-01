using System.Threading.Tasks;
using Application.Prices.Commands.CreatePrice;
using Application.Prices.Commands.DeletePrice;
using Application.Prices.Commands.UpdatePrice;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/sportObjects")]
  public class PricesController : ApiController
  {
    [HttpPost("{id}/prices")]
    public async Task<ActionResult<int>> Create(int id, CreatePriceCommand command)
    {
      command.SportObjectId = id;

      return await Mediator.Send(command);
    }

    [HttpPut("{id}/prices/{priceId}")]
    public async Task<ActionResult<Unit>> Update(int priceId, UpdatePriceCommand command)
    {
      command.Id = priceId;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}/prices/{priceId}")]
    public async Task<ActionResult<Unit>> Delete(int priceId)
    {
      return await Mediator.Send(new DeletePriceCommand { Id = priceId });
    }
  }
}