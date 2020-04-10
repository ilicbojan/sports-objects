using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Commands.CreateRole
{
  public class CreateRoleCommand : IRequest
  {
    public string Name { get; set; }
  }

  public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public CreateRoleCommandHandler(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;
    }

    public async Task<Unit> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
    {
      var identityRole = new IdentityRole { Name = request.Name };

      IdentityResult result = await _roleManager.CreateAsync(identityRole);

      if (result.Succeeded)
      {
        return Unit.Value;
      }

      throw new Exception("Problem creating role.");
    }
  }
}