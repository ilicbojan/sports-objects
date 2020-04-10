using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Countries.Queries.GetCountries
{
  public class CityDto : IMapFrom<City>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}