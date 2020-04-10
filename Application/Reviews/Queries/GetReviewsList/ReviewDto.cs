using System;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Reviews.Queries.GetReviewsList
{
  public class ReviewDto : IMapFrom<Review>
  {
    public string UserName { get; set; }
    public int SportObjectId { get; set; }
    public string SportObjectName { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Review, ReviewDto>()
          .ForMember(d => d.SportObjectName, opt => opt.MapFrom(s => s.SportObject.Name));
    }
  }
}