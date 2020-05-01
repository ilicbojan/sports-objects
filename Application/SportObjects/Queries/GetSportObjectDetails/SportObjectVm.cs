using System.Collections.Generic;
using Application.Common.Mappings;
using Application.SportObjects.Queries.Dtos;
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
    public bool IsPayed { get; set; }
    public bool IsPremium { get; set; }
    public SportDto Sport { get; set; }
    public CityDto City { get; set; }
    public IList<PriceDto> Prices { get; set; }
    public IList<WorkingHourDto> WorkingHours { get; set; }
    public IList<ReviewDto> Reviews { get; set; }
  }
}