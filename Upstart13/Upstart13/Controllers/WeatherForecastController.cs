using Microsoft.AspNetCore.Mvc;
using Upstart13.Domain.DTO.External.Geocoding;
using Upstart13.Domain.DTO.External.Weather;
using Upstart13.Domain.DTO.Request;
using Upstart13.Service.Services;

namespace Upstart13.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IForecastService _forecastService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IForecastService forecastService)
        {
            _logger = logger;
            _forecastService = forecastService;
        }

        [HttpGet("GetGeoLocation")]
        public async Task<List<AddressMatch>> GetGeoLocation([FromQuery] GeolocationRequest request)
        {
            return await _forecastService.GetForecast(request);
        }

        [HttpGet("GetForecast")]
        public async Task<List<WeatherForecastForNextDays>> GetForecast([FromQuery] WeatherRequest request)
        {
            return await _forecastService.GetWeather(request);
        }
    }
}