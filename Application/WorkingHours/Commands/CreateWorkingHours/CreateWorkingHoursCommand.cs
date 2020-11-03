using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.WorkingHours.Commands.CreateWorkingHours
{
    public class WorkingHourDto
    {
        public int Day { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
    }

    public class CreateWorkingHoursCommand : IRequest
    {
        // public int Day { get; set; }
        // public string OpenTime { get; set; }
        // public string CloseTime { get; set; }
        public int SportObjectId { get; set; }
        public List<WorkingHourDto> WorkingHours { get; set; }
    }

    public class CreateWorkingHoursCommandHandler : IRequestHandler<CreateWorkingHoursCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public CreateWorkingHoursCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(CreateWorkingHoursCommand request, CancellationToken cancellationToken)
        {
            // var workingHour = new WorkingHour
            // {
            //   Day = request.Day,
            //   OpenTime = TimeSpan.Parse(request.OpenTime),
            //   CloseTime = TimeSpan.Parse(request.CloseTime),
            //   SportObjectId = request.SportObjectId
            // };

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

            var workingHours = new List<WorkingHour>();

            foreach (var wh in request.WorkingHours)
            {
                var workingHour = new WorkingHour
                {
                    Day = wh.Day,
                    OpenTime = TimeSpan.Parse(wh.OpenTime),
                    CloseTime = TimeSpan.Parse(wh.CloseTime),
                    SportObjectId = request.SportObjectId
                };

                workingHours.Add(workingHour);
            }

            var minTime = workingHours.Min(wh => wh.OpenTime);
            var maxTime = workingHours.Min(wh => wh.CloseTime);

            if (maxTime.Hours != 0)
            {
                maxTime = workingHours.Max(wh => wh.CloseTime);
            }

            var price = new Price
            {
                PricePerHour = 3000,
                TimeFrom = minTime,
                TimeTo = maxTime,
                SportObjectId = request.SportObjectId
            };

            _context.WorkingHours.AddRange(workingHours);
            _context.Prices.Add(price);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}