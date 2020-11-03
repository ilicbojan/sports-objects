using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Commands.CreateReservation
{
    public class CreateReservationCommand : IRequest<int>
    {
        public int SportObjectId { get; set; }
        public string StartTime { get; set; }
        public string Date { get; set; }
        public int? Price { get; set; }
    }

    public class CreateReservationCommandHandler : IRequestHandler<CreateReservationCommand, int>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;
        private readonly UserManager<AppUser> _userManager;

        public CreateReservationCommandHandler(IAppDbContext context, ICurrentUserService currentUserService, IIdentityService identityService, UserManager<AppUser> userManager)
        {
            _currentUserService = currentUserService;
            _identityService = identityService;
            _userManager = userManager;
            _context = context;
        }

        public async Task<int> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
        {
            var sportObject = await _context.SportObjects.FindAsync(request.SportObjectId);

            if (sportObject == null)
            {
                throw new NotFoundException(nameof(SportObject), request.SportObjectId);
            }

            if (!sportObject.IsPayed && !sportObject.IsPremium)
            {
                throw new Exception("Sportski objekat nije premium");
            }

            var startTime = TimeSpan.Parse(request.StartTime);
            var endTime = startTime.Add(TimeSpan.FromHours(1));

            if (startTime.Hours == 23)
            {
                endTime = new TimeSpan(0, 0, 0);
            }

            var date = DateTime.Parse(request.Date);

            Price price;

            if (request.Price == null)
            {
                var maxTimeWorkingHour = sportObject.WorkingHours.Min(wh => wh.CloseTime);

                if (maxTimeWorkingHour.Hours != 0)
                {
                    maxTimeWorkingHour = sportObject.WorkingHours.Max(wh => wh.CloseTime);
                }

                price = sportObject.Prices.SingleOrDefault(p => startTime >= p.TimeFrom && startTime < p.TimeTo && p.TimeTo != maxTimeWorkingHour);

                if (price == null)
                {
                    price = sportObject.Prices.SingleOrDefault(p => p.TimeTo == maxTimeWorkingHour);
                }
            }
            else
            {
                price = new Price
                {
                    PricePerHour = request.Price ?? 0
                };
            }

            var user = await _context.Users.FindAsync(_currentUserService.UserId);
            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(sportObject);
            var isAdmin = await _userManager.IsInRoleAsync(user, RolesEnum.Admin);

            ReservationStatus status;

            if (isOwner || isAdmin)
            {
                status = await _context.ReservationStatuses.SingleOrDefaultAsync(rs => rs.Status == Status.Accepted);
            } else
            {
                status = await _context.ReservationStatuses.SingleOrDefaultAsync(rs => rs.Status == Status.Pending);
            }

            var reservation = new Reservation
            {
                SportObjectId = request.SportObjectId,
                UserId = _currentUserService.UserId,
                StartTime = startTime,
                EndTime = endTime,
                Date = date,
                CreatedAt = DateTime.Now,
                Price = price.PricePerHour,
                StatusId = status.Id
            };

            _context.Reservations.Add(reservation);

            await _context.SaveChangesAsync(cancellationToken);

            return reservation.Id;
        }
    }
}