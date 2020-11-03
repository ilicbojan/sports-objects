using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.SportObjects.Commands.UpdateSportObject
{
    public class UpdateSportObjectCommand : IRequest
    {
        public int Id { get; set; }
        //public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsPayed { get; set; }
        public bool IsPremium { get; set; }
        public int SportId { get; set; }
        public int CityId { get; set; }
    }

    public class UpdateSportObjectCommandHandler : IRequestHandler<UpdateSportObjectCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public UpdateSportObjectCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(UpdateSportObjectCommand request, CancellationToken cancellationToken)
        {
            var sportObject = await _context.SportObjects.FindAsync(request.Id);

            if (sportObject == null)
            {
                throw new NotFoundException(nameof(SportObject), request.Id);
            }

            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(sportObject);

            if (!isOwner)
            {
                throw new Exception("Bad client");
            }

            //sportObject.Email = request.Email;
            sportObject.Name = request.Name;
            sportObject.Address = request.Address;
            sportObject.Phone = request.Phone;
            sportObject.Description = request.Description;
            sportObject.IsPayed = request.IsPayed;
            sportObject.IsPremium = request.IsPremium;
            sportObject.SportId = request.SportId;
            sportObject.CityId = request.CityId;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}