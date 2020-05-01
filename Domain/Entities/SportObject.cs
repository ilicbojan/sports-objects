using System.Collections.Generic;

namespace Domain.Entities
{
  public class SportObject
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Description { get; set; }
    public bool IsPayed { get; set; }
    public bool IsPremium { get; set; }
    public int SportId { get; set; }
    public int CityId { get; set; }

    public virtual ICollection<Review> Reviews { get; set; }
    public virtual ICollection<WorkingHour> WorkingHours { get; set; }
    public virtual ICollection<Price> Prices { get; set; }

    public virtual Sport Sport { get; set; }
    public virtual City City { get; set; }
  }
}