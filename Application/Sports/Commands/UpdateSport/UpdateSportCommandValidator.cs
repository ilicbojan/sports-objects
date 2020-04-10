using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Sports.Commands.UpdateSport
{
  public class UpdateSportCommandValidator : AbstractValidator<UpdateSportCommand>
  {
    private readonly IAppDbContext _context;

    public UpdateSportCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(s => s.Name)
          .NotEmpty().WithMessage("Naziv je obavezan")
          .MaximumLength(15).WithMessage("Naziv ne sme da bude duzi od 15 karaktera")
          .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");
    }

    public async Task<bool> BeUniqueName(UpdateSportCommand model, string name, CancellationToken cancellationToken)
    {
      return await _context.Sports
          .Where(s => s.Id != model.Id)
          .AllAsync(s => s.Name != name);
    }
  }
}