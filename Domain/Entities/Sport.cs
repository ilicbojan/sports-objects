using System.Collections.Generic;

namespace Domain.Entities
{
  public class Sport
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public virtual ICollection<SportObject> SportObjects { get; set; }
  }
}