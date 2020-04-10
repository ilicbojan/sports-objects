using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Cities.Commands.CreateCity
{
  public class CreateCityCommand : IRequest
  {
    public string Name { get; set; }
    public int CountryId { get; set; }
  }

  public class CreateCityCommandHandler : IRequestHandler<CreateCityCommand>
  {
    private readonly IAppDbContext _context;
    public CreateCityCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(CreateCityCommand request, CancellationToken cancellationToken)
    {
      var city = new City
      {
        Name = request.Name,
        CountryId = request.CountryId
      };

      _context.Cities.Add(city);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}