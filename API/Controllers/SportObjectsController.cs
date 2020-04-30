using System.Threading.Tasks;
using Application.SportObjects.Commands.CreateSportObject;
using Application.SportObjects.Commands.DeleteSportObject;
using Application.SportObjects.Commands.UpdateSportObject;
using Application.SportObjects.Queries.GetSportObjectDetails;
using Application.SportObjects.Queries.GetSportObjectsList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [AllowAnonymous]
  public class SportObjectsController : ApiController
  {
    [HttpGet]
    public async Task<ActionResult<SportObjectsListVm>> GetAll()
    {
      return await Mediator.Send(new GetSportObjectsListQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SportObjectVm>> Get(int id)
    {
      return await Mediator.Send(new GetSportObjectDetailsQuery { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateSportObjectCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Update(int id, UpdateSportObjectCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(int id)
    {
      return await Mediator.Send(new DeleteSportObjectCommand { Id = id });
    }
  }
}