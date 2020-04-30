using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Commands.CreateRole
{
  public class CreateRoleCommand : IRequest<string>
  {
    public string Name { get; set; }
  }

  public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, string>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public CreateRoleCommandHandler(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;
    }

    public async Task<string> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
    {
      var identityRole = new IdentityRole { Name = request.Name };

      IdentityResult result = await _roleManager.CreateAsync(identityRole);

      if (result.Succeeded)
      {
        return identityRole.Id;
      }

      throw new Exception("Problem creating role.");
    }
  }
}