namespace Domain.Entities
{
  public class Favourite
  {
    public int Id { get; set; }
    public string UserId { get; set; }
    public int SportObjectId { get; set; }

    public virtual AppUser User { get; set; }
    public virtual SportObject SportObject { get; set; }
  }
}