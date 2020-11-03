using System.Collections.Generic;

namespace Application.Reservations.Queries.Dtos
{
  public class ReservationsListVm
  {
    public IList<ReservationVm> Reservations { get; set; }
    public int ReservationsCount { get; set; }
  }
}