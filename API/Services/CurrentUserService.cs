using System.Linq;
using System.Security.Claims;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace API.Services
{
  public class CurrentUserService : ICurrentUserService
  {
    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
      Username = httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
    }

    public string Username { get; }
  }
}