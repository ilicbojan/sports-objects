using Application.Common.Interfaces;
using Application.SportObjects.Queries.GetSportObjectsList;
using Application.SportObjects.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.SportObjects.Queries.GetFeaturedSportObjectsList
{
    public class GetFeaturedSportObjectsListQuery: IRequest<SportObjectsListVm>
    {

    }

    public class GetFeaturedSportObjectsListQueryHandler : IRequestHandler<GetFeaturedSportObjectsListQuery, SportObjectsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetFeaturedSportObjectsListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SportObjectsListVm> Handle(GetFeaturedSportObjectsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new SportObjectsListVm();

            vm.SportObjects = await _context.SportObjects
                .Where(x => x.IsPremium && x.IsPayed)
                .ProjectTo<SportObjectDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => Guid.NewGuid())
                .Take(3)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
