using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.SportObjects.Commands.DeleteSportObject
{
  public class DeleteSportObjectCommand : IRequest
  {
    public int Id { get; set; }
  }

  public class DeleteSportObjectCommandHandler : IRequestHandler<DeleteSportObjectCommand>
  {
    private readonly IAppDbContext _context;
    public DeleteSportObjectCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(DeleteSportObjectCommand request, CancellationToken cancellationToken)
    {
      var sportObject = await _context.SportObjects.FindAsync(request.Id);

      if (sportObject == null)
      {
        throw new NotFoundException(nameof(SportObject), request.Id);
      }

      _context.SportObjects.Remove(sportObject);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}