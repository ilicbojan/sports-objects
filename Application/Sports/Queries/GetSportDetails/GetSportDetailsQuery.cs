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

namespace Application.Sports.Queries.GetSportDetails
{
  public class GetSportDetailsQuery : IRequest<SportVm>
  {
    public int Id { get; set; }
  }

  public class GetSportDetailsQueryHandler : IRequestHandler<GetSportDetailsQuery, SportVm>
  {
    private readonly IMapper _mapper;
    private readonly IAppDbContext _context;
    public GetSportDetailsQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<SportVm> Handle(GetSportDetailsQuery request, CancellationToken cancellationToken)
    {
      var vm = await _context.Sports
            .Where(s => s.Id == request.Id)
            .ProjectTo<SportVm>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(cancellationToken);

      return vm;
    }
  }
}