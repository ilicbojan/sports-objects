using System.Threading.Tasks;
using Application.Users.Commands.RegisterUser;
using Application.Users.Queries.CurrentUser;
using Application.Users.Queries.LoginUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class UsersController : ApiController
  {
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserVm>> Login(LoginUserQuery query)
    {
      return await Mediator.Send(query);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserVm>> Register(RegisterUserCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<UserVm>> CurrentUser()
    {
      return await Mediator.Send(new CurrentUserQuery());
    }
  }
}