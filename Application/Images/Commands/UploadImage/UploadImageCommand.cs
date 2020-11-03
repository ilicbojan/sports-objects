using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Images.Dtos;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Images.Commands.UploadImage
{
    public class UploadImageCommand : IRequest<ImageVm>
    {
        public IFormFile File{ get; set; }
        public int SportObjectId { get; set; }
    }

    public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, ImageVm>
    {
        private readonly IAppDbContext _context;
        private readonly IImageService _imageService;
        private readonly IIdentityService _identityService;

        public UploadImageCommandHandler(IAppDbContext context, IImageService imageService, IIdentityService identityService)
        {
            _context = context;
            _imageService = imageService;
            _identityService = identityService;
        }

        public async Task<ImageVm> Handle(UploadImageCommand request, CancellationToken cancellationToken)
        {
            var sportObject = await _context.SportObjects.FindAsync(request.SportObjectId);

            if (sportObject == null)
            {
                throw new NotFoundException(nameof(SportObject), sportObject.Id);
            }

            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(sportObject);

            if (!isOwner)
            {
                throw new Exception("Bad client");
            }

            var imageUploadResult = _imageService.AddPhoto(request.File);

            var image = new Image
            {
                Url = imageUploadResult.Url,
                Id = imageUploadResult.PublicId
            };

            if (!sportObject.Images.Any(x => x.IsMain))
            {
                image.IsMain = true;
            }

            sportObject.Images.Add(image);

            await _context.SaveChangesAsync(cancellationToken);

            ImageVm vm = new ImageVm
            {
                Id = image.Id,
                Url = image.Url,
                IsMain = image.IsMain,
                SportObjectId = image.SportObjectId,
            };

            return vm;
        }
    }
}
