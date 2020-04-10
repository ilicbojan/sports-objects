using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Cities.Queries.GetCities
{
  public class CityDto : IMapFrom<City>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Country { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<City, CityDto>()
        .ForMember(d => d.Country, opt => opt.MapFrom(s => s.Country.Name));
    }
  }
}