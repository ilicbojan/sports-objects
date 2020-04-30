using System.Collections.Generic;

namespace Application.Reviews.Queries.Dtos
{
  public class ReviewsListVm
  {
    public IList<ReviewDto> Reviews { get; set; }
    public int ReviewCount { get; set; }
  }
}