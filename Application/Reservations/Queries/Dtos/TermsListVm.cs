using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Reservations.Queries.Dtos
{
    public class TermsListVm
    {
        public TermsListVm()
        {
            TermsByDate = new List<TermByDateDto>();
        }

        public int SportObjectId { get; set; }
        public int TermsCount { get; set; }
        public IList<TermByDateDto> TermsByDate { get; set; }
    }
}
