using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.SportObjects.Commands.CreateSportObject
{
  public class CreateSportObjectCommand : IRequest
  {
    public string Email { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Description { get; set; }
    public bool IsPayed { get; set; }
    public bool IsPremium { get; set; }
    public int SportId { get; set; }
    public int CityId { get; set; }
  }

  public class CreateSportObjectCommandHandler : IRequestHandler<CreateSportObjectCommand>
  {
    private readonly IAppDbContext _context;
    public CreateSportObjectCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(CreateSportObjectCommand request, CancellationToken cancellationToken)
    {
      var sportObject = new SportObject
      {
        Email = request.Email,
        Name = request.Name,
        Address = request.Address,
        Phone = request.Phone,
        Description = request.Description,
        IsPayed = request.IsPayed,
        IsPremium = request.IsPremium,
        SportId = request.SportId,
        CityId = request.CityId
      };

      _context.SportObjects.Add(sportObject);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}