using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkingHours.Commands.UpdateWorkingHours
{
    public class WorkingHourDto
    {
        public int Id { get; set; }
        public int Day { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
    }

    public class UpdateWorkingHoursCommand : IRequest
    {
        public int SportObjectId { get; set; }
        public List<WorkingHourDto> WorkingHours { get; set; }
    }

    public class UpdateWorkingHoursCommandHandler : IRequestHandler<UpdateWorkingHoursCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public UpdateWorkingHoursCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(UpdateWorkingHoursCommand request, CancellationToken cancellationToken)
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

            var workingHours = sportObject.WorkingHours;
            var prices = sportObject.Prices;

            foreach (var wh in workingHours)
            {
                foreach (var whNew in request.WorkingHours)
                {
                    if (wh.Day == whNew.Day)
                    {
                        wh.OpenTime = TimeSpan.Parse(whNew.OpenTime);
                        wh.CloseTime = TimeSpan.Parse(whNew.CloseTime);
                        break;
                    }
                }
            }

            var minTimeWh = workingHours.Min(wh => wh.OpenTime);
            var maxTimeWh = workingHours.Min(wh => wh.CloseTime);

            if (maxTimeWh.Hours != 0)
            {
                maxTimeWh = workingHours.Max(wh => wh.CloseTime);
            }

            prices.Clear();

            var price = new Price
            {
                SportObjectId = sportObject.Id,
                PricePerHour = 3000,
                TimeFrom = minTimeWh,
                TimeTo = maxTimeWh
            };

            prices.Add(price);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}