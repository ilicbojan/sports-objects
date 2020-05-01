using FluentValidation;

namespace Application.Prices.Commands.CreatePrice
{
  public class CreatePriceCommandValidator : AbstractValidator<CreatePriceCommand>
  {
    public CreatePriceCommandValidator()
    {
      RuleFor(p => p.PricePerHour)
            .NotEmpty().WithMessage("Cena je obavezna")
            .LessThanOrEqualTo(99999).WithMessage("Cena ne moze biti veca od 99999");

      RuleFor(p => p.SportObjectId)
              .NotEmpty().WithMessage("Sportski objekat je obavezan");

      RuleFor(p => p.TimeFrom)
              .NotEmpty().WithMessage("Vreme pocetka intervala je obavezno");

      RuleFor(p => p.TimeTo)
              .NotEmpty().WithMessage("Vreme kraja intervala je obavezno");
    }
  }
}