using System.Collections.Generic;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Countries.Queries.GetCountryDetails
{
  public class CountryVm : IMapFrom<Country>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public IList<CityDto> Cities { get; set; }
  }
}