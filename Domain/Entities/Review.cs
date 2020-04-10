using System;

namespace Domain.Entities
{
  public class Review
  {
    public string UserName { get; set; }
    public int SportObjectId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public virtual AppUser User { get; set; }
    public virtual SportObject SportObject { get; set; }
  }
}