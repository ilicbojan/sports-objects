using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Countries.Queries.Dtos
{
  public class SportObjectDto : IMapFrom<SportObject>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
  }
}