using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Image
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public int SportObjectId { get; set; }

        public virtual SportObject SportObject { get; set; }
    }
}
