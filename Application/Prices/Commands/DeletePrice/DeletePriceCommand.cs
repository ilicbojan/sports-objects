using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Prices.Commands.DeletePrice
{
  public class DeletePriceCommand : IRequest
  {
    public int Id { get; set; }
  }

  public class DeletePriceCommandHandler : IRequestHandler<DeletePriceCommand>
  {
    private readonly IAppDbContext _context;
    public DeletePriceCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(DeletePriceCommand request, CancellationToken cancellationToken)
    {
      var price = await _context.Prices.FindAsync(request.Id);

      if (price == null)
      {
        throw new NotFoundException(nameof(Price), request.Id);
      }

      _context.Prices.Remove(price);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}