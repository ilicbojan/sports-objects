using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Prices.Commands.CreatePrice
{
  public class CreatePriceCommand : IRequest<int>
  {
    public int SportObjectId { get; set; }
    public int PricePerHour { get; set; }
    public string TimeFrom { get; set; }
    public string TimeTo { get; set; }
  }

  public class CreatePriceCommandHandler : IRequestHandler<CreatePriceCommand, int>
  {
    private readonly IAppDbContext _context;
    public CreatePriceCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<int> Handle(CreatePriceCommand request, CancellationToken cancellationToken)
    {
      var price = new Price
      {
        SportObjectId = request.SportObjectId,
        PricePerHour = request.PricePerHour,
        TimeFrom = TimeSpan.Parse(request.TimeFrom),
        TimeTo = TimeSpan.Parse(request.TimeTo)
      };

      _context.Prices.Add(price);

      await _context.SaveChangesAsync(cancellationToken);

      return price.Id;
    }
  }
}