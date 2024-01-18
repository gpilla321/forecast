using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Upstart13.Domain.DTO.External.Geocoding
{
    public class GeoResultDTO
    {
        public Result Result { get; set; }     
    }

    public class Result
    {
        public List<AddressMatch> AddressMatches { get; set; }
    }

    public class AddressMatch
    {
        public Coordinates Coordinates { get; set; }
        public AddressComponents AddressComponents { get; set; }
    }

    public class Coordinates
    {
        public double X { get; set; }
        public double Y { get; set; }
    }
    public class AddressComponents
    {
        public string Zip { get; set; }
        public string StreetName { get; set; }
        public string PreType { get; set; }
        public string City { get; set; }
        public string PreDirection { get; set; }
        public string SuffixDirection { get; set; }
        public string FromAddress { get; set; }
        public string State { get; set; }
        public string SuffixType { get; set; }
        public string ToAddress { get; set; }
        public string SuffixQualifier { get; set; }
        public string PreQualifier { get; set; }
    }
}
