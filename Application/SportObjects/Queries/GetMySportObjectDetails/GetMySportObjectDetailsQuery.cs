using Application.Common.Interfaces;
using Application.SportObjects.Queries.GetSportObjectDetails;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.SportObjects.Queries.GetMySportObjectDetails
{
    public class GetMySportObjectDetailsQuery : IRequest<SportObjectVm>
    {
    }

    public class GetMySportObjectDetailsQueryHandler : IRequestHandler<GetMySportObjectDetailsQuery, SportObjectVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICurrentUserService _currentUserService;

        public GetMySportObjectDetailsQueryHandler(IAppDbContext context, IMapper mapper, UserManager<AppUser> userManager, ICurrentUserService currentUserService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _currentUserService = currentUserService;
            _context = context;
        }

        public async Task<SportObjectVm> Handle(GetMySportObjectDetailsQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);

            var vm = await _context.SportObjects
                    .Where(so => so.Email == user.Email)
                    .ProjectTo<SportObjectVm>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}
