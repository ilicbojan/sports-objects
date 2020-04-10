using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.SportObjects.Queries.GetSportObjectDetails
{
  public class SportObjectVm : IMapFrom<SportObject>
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Description { get; set; }
    public string Sport { get; set; }
    public string City { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<SportObject, SportObjectVm>()
        .ForMember(d => d.Sport, opt => opt.MapFrom(s => s.Sport.Name))
        .ForMember(d => d.City, opt => opt.MapFrom(s => s.City.Name));
    }
  }
}