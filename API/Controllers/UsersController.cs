using System.Threading.Tasks;
using Application.Users.Commands.AddUserToRole;
using Application.Users.Commands.CreateUser;
using Application.Users.Commands.DeleteUser;
using Application.Users.Commands.RegisterUser;
using Application.Users.Commands.RemoveUserFromRole;
using Application.Users.Commands.UpdateUser;
using Application.Users.Queries.CurrentUser;
using Application.Users.Queries.Dtos;
using Application.Users.Queries.GetUserDetails;
using Application.Users.Queries.GetUsersList;
using Application.Users.Queries.LoginAdminUser;
using Application.Users.Queries.LoginUser;
using MediatR;
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
    [HttpPost("loginAdmin")]
    public async Task<ActionResult<AdminUserVm>> LoginAdmin(LoginAdminUserQuery query)
    {
      return await Mediator.Send(query);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserVm>> Register(RegisterUserCommand command)
    {
      return await Mediator.Send(command);
    }


    [HttpGet("current")]
    public async Task<ActionResult<UserVm>> CurrentUser()
    {
      return await Mediator.Send(new CurrentUserQuery());
    }

    [HttpGet]
    public async Task<ActionResult<UsersListVm>> GetAll()
    {
      return await Mediator.Send(new GetUsersListQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> Get(string id)
    {
      return await Mediator.Send(new GetUserDetailsQuery { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<string>> Create(CreateUserCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Update(string id, UpdateUserCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(string id)
    {
      return await Mediator.Send(new DeleteUserCommand { Id = id });
    }

    [HttpPost("{id}/roles")]
    public async Task<ActionResult<Unit>> AddUserToRole(string id, AddUserToRoleCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}/roles")]
    public async Task<ActionResult<Unit>> RemoveUserFromRole(string id, RemoveUserFromRoleCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }
  }
}