using System.Threading.Tasks;
using Application.Sports.Commands.CreateSport;
using Application.Sports.Commands.DeleteSport;
using Application.Sports.Commands.UpdateSport;
using Application.Sports.Queries.GetSportDetails;
using Application.Sports.Queries.GetSportsList;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class SportsController : ApiController
  {
    [HttpGet]
    public async Task<ActionResult<SportsListVm>> GetAll()
    {
      return await Mediator.Send(new GetSportsListQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SportVm>> Get(int id)
    {
      return await Mediator.Send(new GetSportDetailsQuery { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(CreateSportCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Update(int id, UpdateSportCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(int id)
    {
      return await Mediator.Send(new DeleteSportCommand { Id = id });
    }
  }
}