using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Prices.Commands.UpdatePrice
{
  public class UpdatePriceCommand : IRequest
  {
    public int Id { get; set; }
    public int PricePerHour { get; set; }
    public string TimeFrom { get; set; }
    public string TimeTo { get; set; }
  }

  public class UpdatePriceCommandHandler : IRequestHandler<UpdatePriceCommand>
  {
    private readonly IAppDbContext _context;
    public UpdatePriceCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(UpdatePriceCommand request, CancellationToken cancellationToken)
    {
      var price = await _context.Prices.FindAsync(request.Id);

      if (price == null)
      {
        throw new NotFoundException(nameof(Price), request.Id);
      }

      price.PricePerHour = request.PricePerHour;
      price.TimeFrom = TimeSpan.Parse(request.TimeFrom);
      price.TimeTo = TimeSpan.Parse(request.TimeTo);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}