using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalHost.Spotify.Config
{
    public class SpotifyConfig
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Authority { get; set; }
    }
}
//{
//    "iisSettings": {
//        "windowsAuthentication": false,
//    "anonymousAuthentication": true,
//    "iisExpress": {
//            "applicationUrl": "http://localhost:58739/",
//      "sslPort": 44305
//    }
//    },
//  "profiles": {
//        "IIS Express": {
//            "commandName": "IISExpress",
//      "launchBrowser": true,
//      "environmentVariables": {
//                "ASPNETCORE_ENVIRONMENT": "Development"
//      }
//        },
//    "LocalHost.Spotify": {
//            "commandName": "Project",
//      "launchBrowser": true,
//      "environmentVariables": {
//                "ASPNETCORE_ENVIRONMENT": "Development"
//      },
//      "applicationUrl": "https://localhost:5001;http://localhost:5000"
//    }
//    }
//}