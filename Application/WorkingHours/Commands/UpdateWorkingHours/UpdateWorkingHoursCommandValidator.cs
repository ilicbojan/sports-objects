using FluentValidation;

namespace Application.WorkingHours.Commands.UpdateWorkingHours
{
  public class UpdateWorkingHoursCommandValidator : AbstractValidator<UpdateWorkingHoursCommand>
  {
    public UpdateWorkingHoursCommandValidator()
    {
      RuleFor(wh => wh.WorkingHours.Count)
                  .InclusiveBetween(7, 7).WithMessage("Morate uneti radno vreme za sve dane");

      RuleForEach(wh => wh.WorkingHours)
            .NotEmpty().WithMessage("Radno vreme je obavezno");
    }
  }

  public class WorkingHourDtoValidator : AbstractValidator<WorkingHourDto>
  {
    public WorkingHourDtoValidator()
    {
      RuleFor(wh => wh.OpenTime)
              .NotEmpty()
              .WithMessage("Vreme otvaranja je obavezno");

      RuleFor(wh => wh.CloseTime)
              .NotEmpty()
              .WithMessage("Vreme zatvaranja je obavezno");
    }
  }
}