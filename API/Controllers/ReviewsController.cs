using System.Threading.Tasks;
using Application.Reviews.Commands.CreateReview;
using Application.Reviews.Commands.DeleteReview;
using Application.Reviews.Commands.UpdateReview;
using Application.Reviews.Queries.Dtos;
using Application.Reviews.Queries.GetReviewsList;
using Application.Reviews.Queries.GetReviewsListAll;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/sportobjects")]
  public class ReviewsController : ApiController
  {
    [Route("/api/reviews")]
    [HttpGet]
    public async Task<ActionResult<ReviewsListVm>> GetAll()
    {
      return await Mediator.Send(new GetReviewsListAllQuery());
    }

    [HttpGet("{id}/reviews")]
    public async Task<ActionResult<ReviewsListVm>> GetAll(int id)
    {
      return await Mediator.Send(new GetReviewsListQuery { SportObjectId = id });
    }

    [HttpPost("{id}/reviews")]
    public async Task<ActionResult<Unit>> Create(int id, CreateReviewCommand command)
    {
      command.SportObjectId = id;

      return await Mediator.Send(command);
    }

    [HttpPut("{id}/reviews")]
    public async Task<ActionResult<Unit>> Update(int id, UpdateReviewCommand command)
    {
      command.SportObjectId = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}/reviews")]
    public async Task<ActionResult<Unit>> Delete(int id)
    {
      return await Mediator.Send(new DeleteReviewCommand { SportObjectId = id });
    }
  }
}