using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Upstart13.Domain.DTO.External.Geocoding;
using Upstart13.Domain.DTO.External.Weather;
using Upstart13.Domain.DTO.Request;
using Upstart13.Service.Common;

namespace Upstart13.Service.External
{
    public interface IWeatherService
    {
        Task<string> GetForecastUrl(WeatherRequest request);
        Task<List<WeatherForecastForNextDays>> GetForecast(string forecastUrl);
    }
    public class WeatherService : IWeatherService
    {
        public async Task<string> GetForecastUrl(WeatherRequest request)
        {
            var helper = new RESTHelper<WatherForecastUrlResultDTO>("https://api.weather.gov/points/");

            var parameters = new List<string>()
            {
                { request.Latitude.ToString() },
                { request.Longitude.ToString() }
            };

            var data = await helper.Get(parameters);

            return data?.Properties?.Forecast ?? string.Empty;
        }

        public async Task<List<WeatherForecastForNextDays>> GetForecast(string forecastUrl)
        {
            var helper = new RESTHelper<WeatherForecastResultDTO>(forecastUrl);

            var data = await helper.Get();

            return data?.Properties.Periods ?? new List<WeatherForecastForNextDays>();
        }
    }
}
