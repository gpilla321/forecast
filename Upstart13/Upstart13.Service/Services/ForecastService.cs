using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Upstart13.Domain.DTO.External.Geocoding;
using Upstart13.Domain.DTO.External.Weather;
using Upstart13.Domain.DTO.Request;
using Upstart13.Service.Common;
using Upstart13.Service.External;

namespace Upstart13.Service.Services
{
    public interface IForecastService
    {
        Task<List<AddressMatch>> GetForecast(GeolocationRequest request);
        Task<List<WeatherForecastForNextDays>> GetWeather(WeatherRequest request);
    }
    public class ForecastService : IForecastService
    {
        private readonly IGeocodingService _geocodingService;
        private readonly IWeatherService _weatherService;

        public ForecastService(IGeocodingService geocodingService, IWeatherService weatherService)
        {
            _geocodingService = geocodingService;
            _weatherService = weatherService;
        }

        public async Task<List<WeatherForecastForNextDays>> GetWeather(WeatherRequest request)
        {
            var forecastUrl = await _weatherService.GetForecastUrl(request);

            if(string.IsNullOrEmpty(forecastUrl))
                throw new Exception("Forecast not found");

            return await _weatherService.GetForecast(forecastUrl);
        }

        public async Task<List<AddressMatch>> GetForecast(GeolocationRequest request)
        {
            return await _geocodingService.GetForecast(request);
        }
    }
}
