using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Commands.UpdateRole
{
  public class UpdateRoleCommand : IRequest
  {
    public string Id { get; set; }
    public string Name { get; set; }
  }

  public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public UpdateRoleCommandHandler(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;
    }

    public async Task<Unit> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
    {
      var role = await _roleManager.FindByIdAsync(request.Id);

      if (role == null)
      {
        throw new NotFoundException(nameof(IdentityRole), request.Name);
      }

      role.Name = request.Name;

      var result = await _roleManager.UpdateAsync(role);

      if (result.Succeeded)
      {
        return Unit.Value;
      }

      throw new Exception("Problem updating role.");
    }
  }
}