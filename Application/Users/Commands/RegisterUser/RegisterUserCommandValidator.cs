using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.RegisterUser
{
  public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
  {
    private readonly IAppDbContext _context;
    public RegisterUserCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(v => v.Email)
          .NotEmpty().WithMessage("Email je obavezan")
          .EmailAddress().WithMessage("Email nije u ispravnom formatu")
          .MustAsync(BeUniqueEmail).WithMessage("Email vec postoji");

      RuleFor(v => v.Password)
          .NotEmpty().WithMessage("Password je obavezan");
    }

    public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
      return await _context.Users.AllAsync(c => c.Email != email);
    }
  }
}