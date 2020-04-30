using System.Collections.Generic;
using Application.SportObjects.Queries.Dtos;

namespace Application.SportObjects.Queries.GetSportObjectsList
{
  public class SportObjectsListVm
  {
    public IList<SportObjectDto> SportObjects { get; set; }
  }
}