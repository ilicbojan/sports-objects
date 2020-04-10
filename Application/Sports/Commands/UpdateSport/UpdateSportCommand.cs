using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Sports.Commands.UpdateSport
{
  public class UpdateSportCommand : IRequest
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }

  public class UpdateSportCommandHandler : IRequestHandler<UpdateSportCommand>
  {
    private readonly IAppDbContext _context;
    public UpdateSportCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(UpdateSportCommand request, CancellationToken cancellationToken)
    {
      var sport = await _context.Sports.FindAsync(request.Id);

      if (sport == null)
      {
        throw new NotFoundException(nameof(Sport), request.Id);
      }

      sport.Name = request.Name;

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}