using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkingHours.Commands.CreateWorkingHours
{
  public class CreateWorkingHoursCommandValidator : AbstractValidator<CreateWorkingHoursCommand>
  {
    private readonly IAppDbContext _context;
    public CreateWorkingHoursCommandValidator(IAppDbContext context)
    {
      this._context = context;

      RuleFor(wh => wh.WorkingHours.Count)
                  .NotEmpty().WithMessage("Radno vreme je obavezno")
                  .InclusiveBetween(7, 7).WithMessage("Morate uneti radno vreme za sve dane");

      RuleFor(wh => wh.SportObjectId).MustAsync(WorkingHoursExists).WithMessage("Radno vreme za izabrani sportski objekat vec postoji");
    }

    public async Task<bool> WorkingHoursExists(int sportObjectId, CancellationToken cancellationToken)
    {
      return await _context.WorkingHours.AllAsync(wh => wh.SportObjectId != sportObjectId);
    }
  }
}