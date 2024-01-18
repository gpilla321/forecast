using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Upstart13.Domain.DTO.Request
{
    public class GeolocationRequest
    {
        public string Street { get; set; }
        public string ZIP { get; set; }
        public string City { get; set; }
    }
}
