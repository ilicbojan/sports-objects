using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Sports.Commands.CreateSport
{
  public class CreateSportCommand : IRequest<int>
  {
    public string Name { get; set; }
  }

  public class CreateSportCommandHandler : IRequestHandler<CreateSportCommand, int>
  {
    private readonly IAppDbContext _context;
    public CreateSportCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<int> Handle(CreateSportCommand request, CancellationToken cancellationToken)
    {
      var sport = new Sport { Name = request.Name };

      _context.Sports.Add(sport);

      await _context.SaveChangesAsync(cancellationToken);

      return sport.Id;
    }
  }
}