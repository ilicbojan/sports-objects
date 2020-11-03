using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prices.Commands.CreatePrice
{
    public class CreatePriceCommand : IRequest<int>
    {
        public int SportObjectId { get; set; }
        public int PricePerHour { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
    }

    public class CreatePriceCommandHandler : IRequestHandler<CreatePriceCommand, int>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public CreatePriceCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<int> Handle(CreatePriceCommand request, CancellationToken cancellationToken)
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

            if (sportObject.WorkingHours.Count == 0)
            {
                throw new Exception("Morate da popunite radno vreme");
            }

            if (sportObject.Prices.Count > 5)
            {
                throw new Exception("Maksimalan broj cena je 6.");
            }

            var maxTimeWorkingHour = sportObject.WorkingHours.Min(wh => wh.CloseTime);

            if (maxTimeWorkingHour.Hours != 0)
            {
                maxTimeWorkingHour = sportObject.WorkingHours.Max(wh => wh.CloseTime);
            }

            var lastPrice = sportObject.Prices.FirstOrDefault(p => p.TimeTo == maxTimeWorkingHour);

            ChangeExistingPrice(sportObject, lastPrice);

            var timeFrom = new TimeSpan(maxTimeWorkingHour.Hours - 1, 0, 0);

            if (maxTimeWorkingHour.Hours == 0)
            {
                timeFrom = new TimeSpan(23, 0, 0);
            }

            var price = new Price
            {
                SportObjectId = request.SportObjectId,
                PricePerHour = request.PricePerHour,
                TimeFrom = timeFrom,
                TimeTo = maxTimeWorkingHour
            };

            _context.Prices.Add(price);

            await _context.SaveChangesAsync(cancellationToken);

            return price.Id;
        }

        private void ChangeExistingPrice(SportObject sportObject, Price price)
        {
            var timeDifference = 0;
            var midnightHours = 24;
            var hours = 0;

            if (price.TimeTo.Hours == 0)
            {
                timeDifference = midnightHours - price.TimeFrom.Hours;
                hours = 23;
            }
            else
            {
                timeDifference = price.TimeTo.Hours - price.TimeFrom.Hours;
                hours = price.TimeTo.Hours - 1;
            }

            if (timeDifference > 1)
            {
                price.TimeTo = new TimeSpan(hours, 0, 0);
            }
            else if (timeDifference == 1)
            {
                var priceBefore = sportObject.Prices.FirstOrDefault(p => p.TimeTo == price.TimeFrom);

                price.TimeFrom = new TimeSpan(price.TimeFrom.Hours - 1, 0, 0);
                price.TimeTo = new TimeSpan(hours, 0, 0);

                if (priceBefore == null)
                {
                    return;
                }

                ChangeExistingPrice(sportObject, priceBefore);
            }

            return;
        }
    }
}

//foreach (var p in sportObject.Prices)
//{
//    var midnight = 24;
//    var timeDifference = p.TimeTo.Hours - p.TimeFrom.Hours;

//    if (p.TimeTo.Hours == 0)
//    {
//        timeDifference = midnight - p.TimeFrom.Hours;
//    }

//    if (p.TimeFrom != minTimeWorkingHour)
//    {
//        if (timeDifference <= 1)
//        {
//            throw new Exception("Morate da izmenite intervale za postojece cene");
//        }
//        else if (timeDifference > 1)
//        {
//            p.TimeFrom = new TimeSpan(p.TimeFrom.Hours - 1, 0, 0);
//        }

//        if (p.TimeTo.Hours == 0)
//        {
//            p.TimeTo = new TimeSpan(23, 0, 0);
//        }
//        else
//        {
//            p.TimeTo = new TimeSpan(p.TimeTo.Hours - 1, 0, 0);
//        }
//    }
//    else
//    {
//        if (timeDifference > 1)
//        {
//            if (p.TimeTo.Hours == 0)
//            {
//                p.TimeTo = new TimeSpan(23, 0, 0);
//            }
//            else
//            {
//                p.TimeTo = new TimeSpan(p.TimeTo.Hours - 1, 0, 0);
//            }
//        }
//    }
//}