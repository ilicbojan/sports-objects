using System;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.SportObjects.Queries.Dtos
{
  public class ReviewDto : IMapFrom<Review>
  {
    public string Username { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}