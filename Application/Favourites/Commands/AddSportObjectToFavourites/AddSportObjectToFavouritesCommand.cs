using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Favourites.Commands.AddSportObjectToFavourites
{
    public class AddSportObjectToFavouritesCommand : IRequest<int>
    {
        public int SportObjectId { get; set; }
    }

    public class AddSportObjectToFavouritesCommandHandler : IRequestHandler<AddSportObjectToFavouritesCommand, int>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddSportObjectToFavouritesCommandHandler(IAppDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(AddSportObjectToFavouritesCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var existing = await _context.Favourites.FindAsync(userId, request.SportObjectId);

            if (existing != null)
            {
                throw new Exception("Sportski objekat je vec u omiljenim");
            }

            var sportObject = await _context.SportObjects.FindAsync(request.SportObjectId);

            if (sportObject == null)
            {
                throw new NotFoundException(nameof(SportObject), request.SportObjectId);
            }

            Favourite favourite = new Favourite
            {
                SportObjectId = sportObject.Id,
                UserId = userId
            };

            _context.Favourites.Add(favourite);

            await _context.SaveChangesAsync(cancellationToken);

            return favourite.Id;
        }
    }
}
