using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Roles.Queries.GetRolesList
{
  public class GetRolesListQuery : IRequest<RolesListVm>
  {
  }
  public class GetRolesListQueryHandler : IRequestHandler<GetRolesListQuery, RolesListVm>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public GetRolesListQueryHandler(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;
    }

    public async Task<RolesListVm> Handle(GetRolesListQuery request, CancellationToken cancellationToken)
    {
      var roles = await _roleManager.Roles
          .OrderBy(r => r.Name)
          .ToListAsync();

      var vm = new RolesListVm();

      foreach (var role in roles)
      {
        vm.Roles.Add(new RoleDto { Id = role.Id, Name = role.Name });
      }

      return vm;
    }
  }
}