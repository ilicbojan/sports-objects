using Application.Reservations.Queries.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Interfaces
{
    public interface IReservationService
    {
        List<FreeTermDto> GetFreeTerms(SportObject sportObject);
        List<TermByDateDto> GetAllTerms(SportObject sportObject);
    }
}
