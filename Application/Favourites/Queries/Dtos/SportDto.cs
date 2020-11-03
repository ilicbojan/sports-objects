using Application.Common.Mappings;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Favourites.Queries.Dtos
{
    public class SportDto : IMapFrom<Sport>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
