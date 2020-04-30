using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Sports.Queries.Dtos;
using Domain.Entities;

namespace Application.Sports.Queries.GetSportDetails
{
  public class SportVm : IMapFrom<Sport>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public IList<SportObjectDto> SportObjects { get; set; }
  }
}