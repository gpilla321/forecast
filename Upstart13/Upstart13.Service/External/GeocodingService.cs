using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Upstart13.Domain.DTO.External.Geocoding;
using Upstart13.Domain.DTO.Request;
using Upstart13.Service.Common;

namespace Upstart13.Service.External
{
    public interface IGeocodingService
    {
        Task<List<AddressMatch>> GetForecast(GeolocationRequest request);
    }

    public class GeocodingService : IGeocodingService
    {
        public GeocodingService() { }

        public async Task<List<AddressMatch>> GetForecast(GeolocationRequest request)
        {
            var helper = new RESTHelper<GeoResultDTO>("https://geocoding.geo.census.gov/geocoder/locations/address");

            var parameters = new Dictionary<string, string>()
            {
                { "street", request.Street },
                { "zip", request.ZIP },
                { "city", request.City },
                { "format", "json" },
                { "benchmark", "Public_AR_Census2020" }
            };

            var data = await helper.Get(parameters);

            return data?.Result?.AddressMatches ?? new List<AddressMatch>();
        }
    }
}
