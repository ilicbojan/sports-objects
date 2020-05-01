using System;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.SportObjects.Queries.Dtos
{
  public class PriceDto : IMapFrom<Price>
  {
    public int Id { get; set; }
    public int PricePerHour { get; set; }
    public TimeSpan TimeFrom { get; set; }
    public TimeSpan TimeTo { get; set; }

  }
}