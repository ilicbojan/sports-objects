using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Sports.Queries.GetSportDetails
{
  public class SportVm : IMapFrom<Sport>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}