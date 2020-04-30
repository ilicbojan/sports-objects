using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.UpdateUser
{
  public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
  {
    private readonly IAppDbContext _context;
    public UpdateUserCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(u => u.Email)
          .NotEmpty().WithMessage("Email je obavezan")
          .EmailAddress().WithMessage("Email nije u ispravnom formatu")
          .MustAsync(BeUniqueEmail).WithMessage("Email vec postoji");
    }

    public async Task<bool> BeUniqueEmail(UpdateUserCommand model, string email, CancellationToken cancellationToken)
    {
      return await _context.Users
            .Where(u => u.Id != model.Id)
            .AllAsync(u => u.Email != email);
    }
  }
}