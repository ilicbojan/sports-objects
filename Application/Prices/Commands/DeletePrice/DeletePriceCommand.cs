using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prices.Commands.DeletePrice
{
    public class DeletePriceCommand : IRequest
    {
        public int SportObjectId { get; set; }
        public int PriceId { get; set; }
    }

    public class DeletePriceCommandHandler : IRequestHandler<DeletePriceCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public DeletePriceCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(DeletePriceCommand request, CancellationToken cancellationToken)
        {
            var sportObject = await _context.SportObjects.FindAsync(request.SportObjectId);

            if (sportObject == null)
            {
                throw new NotFoundException(nameof(SportObject), request.SportObjectId);
            }

            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(sportObject);

            if (!isOwner)
            {
                throw new Exception("Bad client");
            }

            var price = sportObject.Prices.SingleOrDefault(p => p.Id == request.PriceId);

            if (price == null)
            {
                throw new NotFoundException(nameof(Price), request.PriceId);
            }

            if (sportObject.Prices.Count <= 1)
            {
                throw new Exception("Ne mozete da izbrisete jedinu cenu. Mora da postoji bar jedna.");
            }

            var minTimeWorkingHour = sportObject.WorkingHours.Min(wh => wh.OpenTime);
            var maxTimeWorkingHour = sportObject.WorkingHours.Min(wh => wh.CloseTime);

            if (maxTimeWorkingHour.Hours != 0)
            {
                maxTimeWorkingHour = sportObject.WorkingHours.Max(wh => wh.CloseTime);
            }

            var priceAfter = sportObject.Prices.FirstOrDefault(p => p.TimeFrom == price.TimeTo);
            var priceBefore = sportObject.Prices.FirstOrDefault(p => p.TimeTo == price.TimeFrom);

            if (price.TimeFrom == minTimeWorkingHour)
            {
                priceAfter.TimeFrom = minTimeWorkingHour;
            }
            else if (price.TimeTo == maxTimeWorkingHour)
            {
                priceBefore.TimeTo = maxTimeWorkingHour;
            }
            else
            {
                priceBefore.TimeTo = price.TimeTo;
            }

            _context.Prices.Remove(price);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}