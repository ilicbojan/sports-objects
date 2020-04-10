using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Reviews.Commands.CreateReview
{
  public class CreateReviewCommand : IRequest
  {
    public int SportObjectId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
  }

  public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand>
  {
    private readonly IAppDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;
    public CreateReviewCommandHandler(IAppDbContext context, ICurrentUserService currentUserService, IDateTime dateTime)
    {
      _dateTime = dateTime;
      _currentUserService = currentUserService;
      _context = context;
    }

    public async Task<Unit> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
      var review = new Review
      {
        UserName = _currentUserService.Username,
        SportObjectId = request.SportObjectId,
        Rating = request.Rating,
        Comment = request.Comment,
        CreatedAt = _dateTime.Now
      };

      _context.Reviews.Add(review);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}