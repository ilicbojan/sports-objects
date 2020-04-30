using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Sports.Queries.Dtos;
using Domain.Entities;

namespace Application.Sports.Queries.GetSportsList
{
  public class SportDto : IMapFrom<Sport>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public IList<SportObjectDto> SportObjects { get; set; }
  }
}