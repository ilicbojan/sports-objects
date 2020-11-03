using System.Threading.Tasks;
using Application.Reviews.Commands.CreateReview;
using Application.Reviews.Commands.DeleteReview;
using Application.Reviews.Commands.UpdateReview;
using Application.Reviews.Queries.Dtos;
using Application.Reviews.Queries.GetReviewsList;
using Application.Reviews.Queries.GetReviewsListAll;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/sport-objects")]
    public class ReviewsController : ApiController
    {
        [Authorize(Roles = RolesEnum.Admin)]
        [Route("/api/reviews")]
        [HttpGet]
        public async Task<ActionResult<ReviewsListVm>> GetAll()
        {
            return await Mediator.Send(new GetReviewsListAllQuery());
        }

        [HttpGet("{id}/reviews")]
        public async Task<ActionResult<ReviewsListVm>> Get(int id)
        {
            return await Mediator.Send(new GetReviewsListQuery { SportObjectId = id });
        }

        [Authorize(Roles = RolesEnum.User)]
        [HttpPost("{id}/reviews")]
        public async Task<ActionResult<Unit>> Create(int id, CreateReviewCommand command)
        {
            command.SportObjectId = id;

            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.User)]
        [HttpPut("{id}/reviews")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateReviewCommand command)
        {
            command.SportObjectId = id;

            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.User + "," + RolesEnum.Admin)]
        [HttpDelete("{sportObjectId}/reviews/{userId}")]
        public async Task<ActionResult<Unit>> Delete(int sportObjectId, string userId)
        {
            return await Mediator.Send(new DeleteReviewCommand { SportObjectId = sportObjectId, UserId = userId });
        }
    }
}