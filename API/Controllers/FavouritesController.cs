using Application.Favourites.Commands.AddSportObjectToFavourites;
using Application.Favourites.Commands.RemoveSportObjectFromFavourites;
using Application.Favourites.Queries.Dtos;
using Application.Favourites.Queries.GetFavouritesForUserList;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.User)]
    public class FavouritesController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<FavouritesListVm>> GetAllForUser()
        {
            return await Mediator.Send(new GetFavouritesForUserListQuery());
        }

        [Route("/api/sport-objects/{id}/favourites")]
        [HttpPost]
        public async Task<ActionResult<int>> AddSportObjectToFavourites(int id)
        {
            return await Mediator.Send(new AddSportObjectToFavouritesCommand { SportObjectId = id });
        }

        [Route("/api/sport-objects/{id}/favourites")]
        [HttpDelete]
        public async Task<ActionResult<Unit>> RemoveSportObjectFromFavourites(int id)
        {
            return await Mediator.Send(new RemoveSportObjectFromFavouritesCommand { SportObjectId = id });
        }
    }
}