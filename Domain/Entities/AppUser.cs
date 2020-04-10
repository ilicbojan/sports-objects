using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
  public class AppUser : IdentityUser
  {
    public virtual ICollection<Review> Reviews { get; set; }
  }
}