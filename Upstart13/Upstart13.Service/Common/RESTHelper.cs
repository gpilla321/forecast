using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Upstart13.Service.Common
{
    public interface IRestHelper<T>
    {
        Task<T> Get(object parameters);
    }
    public class RESTHelper<T> : IRestHelper<T> where T : class
    {
        private readonly string _url;
        public RESTHelper(string url)
        {
            _url = url;
        }

        public async Task<T> Get(object parameters = null)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "Upstart13");
                    
                    string apiUrl = parameters != null ? BuildApiUrl(_url, parameters) : _url;

                    HttpResponseMessage response = await client.GetAsync(apiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();


                        return JsonConvert.DeserializeObject<T>(responseBody);
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        private string BuildApiUrl(string baseUrl, object parameters)
        {
            var newUrl = string.Empty;

            if(parameters is Dictionary<string, string>) 
                return $"{baseUrl}?{string.Join("&", (parameters as Dictionary<string, string>).Select(_ => $"{_.Key}={Uri.EscapeDataString(_.Value)}"))}";

            if (parameters is List<string>)
                return $"{baseUrl}{string.Join(",", (parameters as List<string>).Select(_ => $"{Uri.EscapeDataString(_)}"))}";

            return baseUrl;
        }
    }
}
