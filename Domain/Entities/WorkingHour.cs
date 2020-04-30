using System;

namespace Domain.Entities
{
  public class WorkingHour
  {
    public int Id { get; set; }
    public int Day { get; set; }
    public TimeSpan OpenTime { get; set; }
    public TimeSpan CloseTime { get; set; }
    public int SportObjectId { get; set; }

    public virtual SportObject SportObject { get; set; }
  }
}