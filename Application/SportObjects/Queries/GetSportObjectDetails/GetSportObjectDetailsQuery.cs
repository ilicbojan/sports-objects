using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SportObjects.Queries.GetSportObjectDetails
{
    public class GetSportObjectDetailsQuery : IRequest<SportObjectVm>
    {
        public int Id { get; set; }
    }

    public class GetSportObjectDetailsQueryHandler : IRequestHandler<GetSportObjectDetailsQuery, SportObjectVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetSportObjectDetailsQueryHandler(IAppDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _mapper = mapper;
            _currentUserService = currentUserService;
            _context = context;
        }

        public async Task<SportObjectVm> Handle(GetSportObjectDetailsQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.SportObjects
                    .Where(so => so.Id == request.Id)
                    .ProjectTo<SportObjectVm>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(cancellationToken);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == _currentUserService.UserId);

            if (user != null)
            {
                if (user.Favourites.Any(x => x.SportObjectId == vm.Id))
                {
                    vm.IsFavourite = true;
                }

                if (user.Reviews.Any(x => x.SportObjectId == vm.Id))
                {
                    vm.IsReviewed = true;
                }
            }

            return vm;
        }
    }
}