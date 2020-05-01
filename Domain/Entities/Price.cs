using System;

namespace Domain.Entities
{
  public class Price
  {
    public int Id { get; set; }
    public int PricePerHour { get; set; }
    public TimeSpan TimeFrom { get; set; }
    public TimeSpan TimeTo { get; set; }
    public int SportObjectId { get; set; }

    public virtual SportObject SportObject { get; set; }
  }
}