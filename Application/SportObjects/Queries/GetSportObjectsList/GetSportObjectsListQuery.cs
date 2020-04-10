using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.SportObjects.Queries.GetSportObjectsList
{
  public class GetSportObjectsListQuery : IRequest<SportObjectsListVm>
  {
  }

  public class GetSportObjectsListQueryHandler : IRequestHandler<GetSportObjectsListQuery, SportObjectsListVm>
  {
    private readonly IMapper _mapper;
    private readonly IAppDbContext _context;
    public GetSportObjectsListQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<SportObjectsListVm> Handle(GetSportObjectsListQuery request, CancellationToken cancellationToken)
    {
      var vm = new SportObjectsListVm();

      vm.SportObjects = await _context.SportObjects
              .ProjectTo<SportObjectDto>(_mapper.ConfigurationProvider)
              .OrderBy(so => so.Name)
              .ToListAsync(cancellationToken);

      return vm;
    }
  }
}