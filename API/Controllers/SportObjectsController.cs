using System.Threading.Tasks;
using Application.SportObjects.Commands.CreateSportObject;
using Application.SportObjects.Commands.DeleteSportObject;
using Application.SportObjects.Commands.UpdateSportObject;
using Application.SportObjects.Queries.GetFeaturedSportObjectsList;
using Application.SportObjects.Queries.GetMySportObjectDetails;
using Application.SportObjects.Queries.GetSportObjectDetails;
using Application.SportObjects.Queries.GetSportObjectsList;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/sport-objects")]
    public class SportObjectsController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<SportObjectsListVm>> GetAll(int? cityId, int? sportId, string? date, string? time, bool isPremium)
        {
            return await Mediator.Send(new GetSportObjectsListQuery(cityId, sportId, date, time, isPremium));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<SportObjectVm>> Get(int id)
        {
            return await Mediator.Send(new GetSportObjectDetailsQuery { Id = id });
        }

        [Authorize(Roles = RolesEnum.Client)]
        [HttpGet("owner")]
        public async Task<ActionResult<SportObjectVm>> GetMy()
        {
            return await Mediator.Send(new GetMySportObjectDetailsQuery());
        }

        [AllowAnonymous]
        [HttpGet("featured")]
        public async Task<ActionResult<SportObjectsListVm>> GetFeatured()
        {
            return await Mediator.Send(new GetFeaturedSportObjectsListQuery());
        }

        [Authorize(Roles = RolesEnum.Admin)]
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateSportObjectCommand command)
        {
            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.Client + "," + RolesEnum.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateSportObjectCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteSportObjectCommand { Id = id });
        }
    }
}