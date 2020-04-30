using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Commands.RemoveUserFromRole
{
  public class RemoveUserFromRoleCommand : IRequest
  {
    public string Id { get; set; }
    public string RoleName { get; set; }
  }

  public class RemoveUserFromRoleCommandHandler : IRequestHandler<RemoveUserFromRoleCommand>
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    public RemoveUserFromRoleCommandHandler(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;
      _userManager = userManager;
    }

    public async Task<Unit> Handle(RemoveUserFromRoleCommand request, CancellationToken cancellationToken)
    {
      var user = await _userManager.FindByIdAsync(request.Id);

      if (user == null)
      {
        throw new NotFoundException(nameof(AppUser), request.Id);
      }

      var role = await _roleManager.FindByNameAsync(request.RoleName);

      if (role == null)
      {
        throw new NotFoundException(nameof(IdentityRole), request.RoleName);
      }

      var result = await _userManager.RemoveFromRoleAsync(user, role.Name);

      if (result.Succeeded)
      {
        return Unit.Value;
      }

      throw new Exception("Problem removing user from role");
    }
  }
}