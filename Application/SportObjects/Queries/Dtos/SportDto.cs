using Application.Common.Mappings;
using Domain.Entities;

namespace Application.SportObjects.Queries.Dtos
{
  public class SportDto : IMapFrom<Sport>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}