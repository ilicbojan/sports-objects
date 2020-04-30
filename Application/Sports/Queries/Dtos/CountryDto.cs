using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Sports.Queries.Dtos
{
  public class CountryDto : IMapFrom<Country>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}