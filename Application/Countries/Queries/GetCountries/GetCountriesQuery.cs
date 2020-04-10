using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Countries.Queries.GetCountries
{
  public class GetCountriesQuery : IRequest<CountriesVm>
  {
  }

  public class GetCountriesQueryHandler : IRequestHandler<GetCountriesQuery, CountriesVm>
  {
    private readonly IAppDbContext _context;
    private readonly IMapper _maper;
    public GetCountriesQueryHandler(IAppDbContext context, IMapper maper)
    {
      _maper = maper;
      _context = context;
    }

    public async Task<CountriesVm> Handle(GetCountriesQuery request, CancellationToken cancellationToken)
    {
      var vm = new CountriesVm();

      vm.Countries = await _context.Countries
          .ProjectTo<CountryDto>(_maper.ConfigurationProvider)
          .OrderBy(n => n.Name)
          .ToListAsync(cancellationToken);

      return vm;
    }
  }
}