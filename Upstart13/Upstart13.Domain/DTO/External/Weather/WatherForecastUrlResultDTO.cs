using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Upstart13.Domain.DTO.External.Weather
{
    public class WatherForecastUrlResultDTO
    {
        public WeatherProperties Properties { get; set; }
    }
    
    public class WeatherProperties
    {
        public string Forecast { get; set; }
    }
}
