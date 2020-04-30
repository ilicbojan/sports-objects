using System.Reflection;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
  public class AppDbContext : IdentityDbContext<AppUser>, IAppDbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Country> Countries { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<Sport> Sports { get; set; }
    public DbSet<SportObject> SportObjects { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<WorkingHour> WorkingHours { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      // ? because Persistence/Configurations ?
      builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

      // added for IdentityDbContext
      base.OnModelCreating(builder);
    }
  }
}