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
    public GetSportObjectDetailsQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<SportObjectVm> Handle(GetSportObjectDetailsQuery request, CancellationToken cancellationToken)
    {
      var vm = await _context.SportObjects
              .Where(so => so.Id == request.Id)
              .ProjectTo<SportObjectVm>(_mapper.ConfigurationProvider)
              .SingleOrDefaultAsync(cancellationToken);

      return vm;
    }
  }
}