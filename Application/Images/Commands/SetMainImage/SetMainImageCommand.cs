using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Images.Commands.SetMainImage
{
    public class SetMainImageCommand : IRequest
    {
        public string Id { get; set; }
        public int SportObjectId { get; set; }
    }

    public class SetMainImageCommandHandler : IRequestHandler<SetMainImageCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public SetMainImageCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(SetMainImageCommand request, CancellationToken cancellationToken)
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

            var image = sportObject.Images.FirstOrDefault(i => i.Id == request.Id);

            if (image == null)
            {
                throw new NotFoundException(nameof(Image), request.Id);
            }

            var currentMain = sportObject.Images.FirstOrDefault(i => i.IsMain);

            currentMain.IsMain = false;
            image.IsMain = true;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
