using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Sports.Queries.GetSportsList
{
  public class GetSportsListQuery : IRequest<SportsListVm>
  {
  }

  public class GetSportsListQueryHandler : IRequestHandler<GetSportsListQuery, SportsListVm>
  {
    private readonly IMapper _mapper;
    private readonly IAppDbContext _context;
    public GetSportsListQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<SportsListVm> Handle(GetSportsListQuery request, CancellationToken cancellationToken)
    {
      var vm = new SportsListVm();

      vm.Sports = await _context.Sports
            .ProjectTo<SportDto>(_mapper.ConfigurationProvider)
            .OrderBy(s => s.Name)
            .ToListAsync(cancellationToken);

      return vm;
    }
  }
}