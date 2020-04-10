using System.Collections.Generic;

namespace Domain.Entities
{
  public class City
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int CountryId { get; set; }

    public virtual ICollection<SportObject> SportObjects { get; set; }

    public virtual Country Country { get; set; }
  }
}