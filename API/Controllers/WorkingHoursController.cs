using System.Threading.Tasks;
using Application.WorkingHours.Commands.CreateWorkingHours;
using Application.WorkingHours.Commands.UpdateWorkingHours;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/sportObjects")]
  public class WorkingHoursController : ApiController
  {
    [HttpPost("{id}/workingHours")]
    public async Task<ActionResult<Unit>> Create(int id, CreateWorkingHoursCommand command)
    {
      command.SportObjectId = id;

      return await Mediator.Send(command);
    }

    [HttpPut("{id}/workingHours")]
    public async Task<ActionResult<Unit>> Update(int id, UpdateWorkingHoursCommand command)
    {
      command.SportObjectId = id;

      return await Mediator.Send(command);
    }
  }
}