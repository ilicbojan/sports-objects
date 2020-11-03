using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.SportObjects.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Application.SportObjects.Queries.GetSportObjectsList
{
    public class GetSportObjectsListQuery : IRequest<SportObjectsListVm>
    {
        // This code is for paging and filtering
        public GetSportObjectsListQuery(int? cityId, int? sportId, string? date, string? time, bool isPremium)
        {
        //    Limit = limit;
        //    Offset = offset;
        //    IsPremium = isPremium;
            CityId = cityId;
            SportId = sportId;
            Date = date;
            Time = time;
            IsPremium = isPremium;
        }

        //public int? Limit { get; set; }
        //public int? Offset { get; set; }
        //public bool IsPremium { get; set; }
        public int? CityId { get; set; }
        public int? SportId { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public bool IsPremium { get; set; }
    }

    public class GetSportObjectsListQueryHandler : IRequestHandler<GetSportObjectsListQuery, SportObjectsListVm>
    {
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IAppDbContext _context;
        private readonly IReservationService _reservationService;

        public GetSportObjectsListQueryHandler(IAppDbContext context, IReservationService reservationService, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _reservationService = reservationService;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<SportObjectsListVm> Handle(GetSportObjectsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new SportObjectsListVm();

            var date = request.Date == null ? DateTime.Now.AddDays(1) : DateTime.Parse(request.Date);
            var time = request.Time == null ? new TimeSpan(12, 0, 0) : TimeSpan.Parse(request.Time);

            // Paging based on limit and offset
            // Filtering - put filter from request in queryable Where()

            var queryable = _context.SportObjects
                    .Where(so => so.IsPayed)
                    .OrderBy(so => so.Name)
                    .AsQueryable();

            // Filter by city
            if (request.CityId != null)
            {
                queryable = queryable.Where(x => x.CityId == request.CityId);
            }

            // Filter by sport
            if (request.SportId != null)
            {
                queryable = queryable.Where(x => x.SportId == request.SportId);
            }

            // Filter by free term date and time
            if (request.Date != null && request.Time != null)
            {
                queryable = queryable.Where(x => x.IsPremium && x.WorkingHours.Count == 7 && x.Prices.Any());

                foreach (var item in queryable)
                {
                    var freeTerms = _reservationService.GetFreeTerms(item);

                    if (!freeTerms.Any(x => x.Date == date && x.StartTime == time))
                    {
                        queryable = queryable.Where(x => x.Id != item.Id);
                    }
                }
            }

            vm.SportObjects = await queryable
            //    .Skip(request.Offset ?? 0)
            //    .Take(request.Limit ?? 4)
                .ProjectTo<SportObjectDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == _currentUserService.UserId);

            if (user != null)
            {
                foreach (var item in vm.SportObjects)
                {
                    if (user.Favourites.Any(x => x.SportObjectId == item.Id))
                    {
                        item.IsFavourite = true;
                    }

                    if (user.Reviews.Any(x => x.SportObjectId == item.Id))
                    {
                        item.IsReviewed = true;
                    }
                }
            }

            return vm;
        }
    }
}