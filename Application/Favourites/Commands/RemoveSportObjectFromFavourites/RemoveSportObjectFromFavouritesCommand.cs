using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Favourites.Commands.RemoveSportObjectFromFavourites
{
    public class RemoveSportObjectFromFavouritesCommand : IRequest
    {
        public int SportObjectId { get; set; }
    }

    public class RemoveSportObjectFromFavouritesCommandHandler : IRequestHandler<RemoveSportObjectFromFavouritesCommand>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RemoveSportObjectFromFavouritesCommandHandler(IAppDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RemoveSportObjectFromFavouritesCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == _currentUserService.UserId);

            var favourite = await _context.Favourites.SingleOrDefaultAsync(f => f.SportObjectId == request.SportObjectId && f.UserId == user.Id);

            if (favourite == null)
            {
                throw new NotFoundException(nameof(SportObject), request.SportObjectId);
            }

            _context.Favourites.Remove(favourite);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
