using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Sports.Commands.CreateSport
{
  public class CreateSportCommandValidator : AbstractValidator<CreateSportCommand>
  {
    private readonly IAppDbContext _context;
    public CreateSportCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(s => s.Name)
            .NotEmpty().WithMessage("Naziv je obavezan")
            .MaximumLength(15).WithMessage("Naziv ne sme biti duzi od 15 karaktera")
            .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");
    }

    public async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
    {
      return await _context.Sports.AllAsync(s => s.Name != name);
    }
  }
}