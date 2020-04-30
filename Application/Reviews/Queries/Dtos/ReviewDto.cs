using System;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Reviews.Queries.Dtos
{
  public class ReviewDto : IMapFrom<Review>
  {
    public UserDto User { get; set; }
    public SportObjectDto SportObject { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}