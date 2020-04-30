using System.Collections.Generic;

namespace Application.Users.Queries.LoginUser
{
  public class UserVm
  {
    public string Token { get; set; }
    public string Id { get; set; }
    public string Username { get; set; }
    public IList<string> Roles { get; set; }
  }
}