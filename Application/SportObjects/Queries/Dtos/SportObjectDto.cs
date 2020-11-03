using System.Collections.Generic;
using System.Linq;
using Application.Common.Interfaces;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.SportObjects.Queries.Dtos
{
    public class SportObjectDto : IMapFrom<SportObject>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsPayed { get; set; }
        public bool IsPremium { get; set; }
        public bool IsFavourite { get; set; }
        public bool IsReviewed { get; set; }
        public SportDto Sport { get; set; }
        public CityDto City { get; set; }
        public ImageDto Image { get; set; }
        public IList<PriceDto> Prices { get; set; }
        public IList<WorkingHourDto> WorkingHours { get; set; }
        public IList<ReviewDto> Reviews { get; set; }
        public IList<ImageDto> Images { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<SportObject, SportObjectDto>()
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Images.FirstOrDefault(x => x.IsMain)));
        }
    }
}