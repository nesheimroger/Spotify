using LocalHost.Spotify.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalHost.Spotify.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        [Route("")]
        public async Task<IActionResult> Index()
        {
            return View();
        }

        [Route("/api/user")]
        public async Task<IActionResult> UserProfile()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var spotify = new SpotifyClient(accessToken);

            var user = await spotify.UserProfile.Current();

            var viewModel = new UserProfile()
            {
                Name = user.DisplayName,
                Email = user.Email
            };
            return Ok(viewModel);
        }
    }
}
