using System.Collections.Generic;

namespace Application.Reviews.Queries.GetReviewsList
{
  public class ReviewsListVm
  {
    public IList<ReviewDto> Reviews { get; set; }
    public int ReviewCount { get; set; }
  }
}