using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Reservations.Queries.Dtos;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Reservations.Queries.GetTermsList
{
    public class GetTermsListQuery : IRequest<TermsListVm>
    {
        public int Id { get; set; }
    }

    public class GetFreeTermsQueryHandler : IRequestHandler<GetTermsListQuery, TermsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IReservationService _reservationService;
        private readonly IMapper _mapper;

        public GetFreeTermsQueryHandler(IAppDbContext context, IReservationService reservationService, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _reservationService = reservationService;
        }

        public async Task<TermsListVm> Handle(GetTermsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new TermsListVm();

            var sportObject = await _context.SportObjects.FindAsync(request.Id);

            if (sportObject == null)
            {
                throw new NotFoundException(nameof(SportObject), request.Id);
            }

            vm.TermsByDate = _reservationService.GetAllTerms(sportObject);
            vm.SportObjectId = request.Id;

            return vm;
        }
    }
}
