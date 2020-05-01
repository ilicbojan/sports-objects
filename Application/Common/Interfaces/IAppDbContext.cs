using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
  public interface IAppDbContext
  {
    DbSet<AppUser> Users { get; set; }
    DbSet<Country> Countries { get; set; }
    DbSet<City> Cities { get; set; }
    DbSet<Sport> Sports { get; set; }
    DbSet<SportObject> SportObjects { get; set; }
    DbSet<Review> Reviews { get; set; }
    DbSet<WorkingHour> WorkingHours { get; set; }
    DbSet<Price> Prices { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}