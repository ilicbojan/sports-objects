using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Sports.Queries.Dtos
{
  public class CityDto : IMapFrom<City>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public CountryDto Country { get; set; }
  }
}