using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Commands.DeleteRole
{
  public class DeleteRoleCommand : IRequest
  {
    public string Id { get; set; }
  }

  public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public DeleteRoleCommandHandler(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;
    }

    public async Task<Unit> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
    {
      var role = await _roleManager.FindByIdAsync(request.Id);

      if (role == null)
      {
        throw new NotFoundException(nameof(IdentityRole), request.Id);
      }

      var result = await _roleManager.DeleteAsync(role);

      if (result.Succeeded)
      {
        return Unit.Value;
      }

      throw new Exception("Problem deleting role.");
    }
  }
}