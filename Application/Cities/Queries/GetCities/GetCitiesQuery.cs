using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cities.Queries.GetCities
{
  public class GetCitiesQuery : IRequest<CitiesVm>
  {
  }

  public class GetCitiesQueryHandler : IRequestHandler<GetCitiesQuery, CitiesVm>
  {
    private readonly IAppDbContext _context;
    private readonly IMapper _mapper;
    public GetCitiesQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<CitiesVm> Handle(GetCitiesQuery request, CancellationToken cancellationToken)
    {
      var vm = new CitiesVm();

      vm.Cities = await _context.Cities
          .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
          .OrderBy(c => c.Name)
          .ToListAsync(cancellationToken);

      return vm;
    }
  }
}