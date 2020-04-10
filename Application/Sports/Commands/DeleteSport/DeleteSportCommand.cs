using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Sports.Commands.DeleteSport
{
  public class DeleteSportCommand : IRequest
  {
    public int Id { get; set; }
  }

  public class DeleteSportCommandHandler : IRequestHandler<DeleteSportCommand>
  {
    private readonly IAppDbContext _context;
    public DeleteSportCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(DeleteSportCommand request, CancellationToken cancellationToken)
    {
      var sport = await _context.Sports.FindAsync(request.Id);

      if (sport == null)
      {
        throw new NotFoundException(nameof(Sport), request.Id);
      }

      _context.Sports.Remove(sport);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}