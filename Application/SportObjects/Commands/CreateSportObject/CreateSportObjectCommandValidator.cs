using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.SportObjects.Commands.CreateSportObject
{
  public class CreateSportObjectCommandValidator : AbstractValidator<CreateSportObjectCommand>
  {
    private readonly IAppDbContext _context;
    public CreateSportObjectCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(so => so.Email)
            .NotEmpty().WithMessage("Email je obavezan")
            .EmailAddress().WithMessage("Email nije u ispravnom formatu")
            .MaximumLength(256).WithMessage("Email ne sme biti duzi od 256 karaktera")
            .MustAsync(BeUniqueEmail).WithMessage("Izabrani email vec postoji");

      RuleFor(so => so.Name)
            .NotEmpty().WithMessage("Naziv je obavezan")
            .MaximumLength(30).WithMessage("Naziv ne sme biti duzi od 256 karaktera")
            .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");

      RuleFor(so => so.Address)
            .NotEmpty().WithMessage("Adresa je obavezna")
            .MaximumLength(50).WithMessage("Adresa ne sme biti duza od 50 karaktera");

      RuleFor(so => so.Phone)
            .NotEmpty().WithMessage("Telefon je obavezan")
            .MaximumLength(10).WithMessage("Telefon ne sme biti duzi od 10 karaktera");

      RuleFor(so => so.Description)
            .NotEmpty().WithMessage("Opis je obavezan")
            .MaximumLength(500).WithMessage("Opis ne sme biti duzi od 500 karaktera");

      RuleFor(so => so.SportId)
            .NotEmpty().WithMessage("Sport je obavezan")
            .MustAsync(SportExists).WithMessage("Izabrani sport ne postoji");

      RuleFor(so => so.CityId)
            .NotEmpty().WithMessage("Grad je obavezan")
            .MustAsync(CityExists).WithMessage("Izabrani grad ne postoji");
    }

    public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
      return await _context.SportObjects.AllAsync(so => so.Email != email);
    }

    public async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
    {
      return await _context.SportObjects.AllAsync(so => so.Name != name);
    }

    public async Task<bool> SportExists(int id, CancellationToken cancellationToken)
    {
      return await _context.Sports.AnyAsync(c => c.Id == id);
    }

    public async Task<bool> CityExists(int id, CancellationToken cancellationToken)
    {
      return await _context.Cities.AnyAsync(c => c.Id == id);
    }
  }
}