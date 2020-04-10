using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Reviews.Commands.DeleteReview
{
  public class DeleteReviewCommand : IRequest
  {
    public int SportObjectId { get; set; }
  }

  public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand>
  {
    private readonly ICurrentUserService _currentUserService;
    private readonly IAppDbContext _context;
    public DeleteReviewCommandHandler(IAppDbContext context, ICurrentUserService currentUserService)
    {
      _context = context;
      _currentUserService = currentUserService;
    }

    public async Task<Unit> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
    {
      var review = await _context.Reviews.FindAsync(_currentUserService.Username, request.SportObjectId);

      if (review == null)
      {
        throw new NotFoundException(nameof(Review), new { _currentUserService.Username, request.SportObjectId, });
      }

      _context.Reviews.Remove(review);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}