using System.Collections.Generic;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Countries.Queries.Dtos
{
  public class CountryDto : IMapFrom<Country>
  {
    public CountryDto()
    {
      Cities = new List<CityDto>();
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public IList<CityDto> Cities { get; set; }
  }
}