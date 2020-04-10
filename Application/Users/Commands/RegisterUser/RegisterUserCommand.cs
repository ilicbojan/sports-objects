using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Users.Queries.LoginUser;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.RegisterUser
{
  public class RegisterUserCommand : IRequest<UserVm>
  {
    public string Email { get; set; }
    public string Password { get; set; }
  }

  public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, UserVm>
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IJwtGenerator _jwtGenerator;
    public RegisterUserCommandHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
    {
      _jwtGenerator = jwtGenerator;
      _signInManager = signInManager;
      _userManager = userManager;
    }

    public async Task<UserVm> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
      var user = new AppUser
      {
        Email = request.Email,
        UserName = request.Email
      };

      var result = await _userManager.CreateAsync(user, request.Password);

      if (result.Succeeded)
      {
        await _userManager.AddToRoleAsync(user, "user");
        var loginResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (loginResult.Succeeded)
        {
          var roles = await _userManager.GetRolesAsync(user);

          return new UserVm
          {
            Token = _jwtGenerator.CreateToken(user),
            Username = user.UserName,
            Roles = roles
          };
        }
      }

      throw new Exception("Problem creating user");
    }
  }
}