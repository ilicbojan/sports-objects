using Application.Common.Mappings;
using Domain.Entities;

namespace Application.SportObjects.Queries.Dtos
{
  public class ReservationStatusDto : IMapFrom<ReservationStatus>
  {
    public int Id { get; set; }
    public string Status { get; set; }
  }
}