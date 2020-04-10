using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
  public class AppDbContextSeed
  {
    public static async Task SeedAsync(AppDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
      if (!roleManager.Roles.Any())
      {
        var roles = new List<IdentityRole>
        {
          new IdentityRole { Name = "admin"},
          new IdentityRole { Name = "client"},
          new IdentityRole { Name = "user"}
        };

        foreach (var role in roles)
        {
          await roleManager.CreateAsync(role);
        }
      }

      if (!userManager.Users.Any())
      {
        var users = new List<AppUser>
        {
          new AppUser { Email = "admin@test.com", UserName = "admin@test.com" },
          new AppUser { Email = "bob@test.com", UserName = "bob@test.com" },
          new AppUser { Email = "john@test.com", UserName = "john@test.com" },
          new AppUser { Email = "rob@test.com", UserName = "rob@test.com" }
        };

        foreach (var user in users)
        {
          await userManager.CreateAsync(user, "test12");
        }
      }

      if (!context.UserRoles.Any())
      {
        var users = await userManager.Users.ToListAsync();

        foreach (var user in users)
        {
          await userManager.AddToRoleAsync(user, "user");
        }

        var admin = await userManager.FindByNameAsync("admin@test.com");
        await userManager.AddToRoleAsync(admin, "admin");
      }

      if (!context.Countries.Any())
      {
        var countries = new List<Country>
        {
            new Country
            {
              Name = "Srbija",
              Cities = new List<City> { new City { Name = "Beograd" }, new City { Name = "Nis"}, new City { Name = "Novi Sad"}}
            },
            new Country { Name = "Hrvatska", Cities = new List<City> { new City { Name = "Zagreb" }} },
            new Country { Name = "Crna Gora", Cities = new List<City> { new City { Name = "Podgorica" }} }
        };

        await context.Countries.AddRangeAsync(countries);

        await context.SaveChangesAsync();
      }

      if (!context.Sports.Any())
      {
        var sports = new List<Sport>
        {
          new Sport { Name = "Fudbal" },
          new Sport { Name = "Kosarka" },
          new Sport { Name = "Tenis" },
          new Sport { Name = "Teretana" },
          new Sport { Name = "Bazen" }
        };

        await context.Sports.AddRangeAsync(sports);

        await context.SaveChangesAsync();
      }
    }
  }
}