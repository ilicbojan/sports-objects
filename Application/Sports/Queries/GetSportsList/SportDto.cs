using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Sports.Queries.GetSportsList
{
  public class SportDto : IMapFrom<Sport>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}