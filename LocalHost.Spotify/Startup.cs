using LocalHost.Spotify.Config;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalHost.Spotify
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var spotify = Configuration.GetSection("Spotify").Get<SpotifyConfig>();

            services
                .AddAuthentication(options => {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = "Spotify";
                })
                .AddCookie()
                .AddOAuth("Spotify", options => {
                    options.AuthorizationEndpoint = spotify.Authority + "authorize";
                    options.TokenEndpoint = spotify.Authority + "api/token";
                    options.ClientId = spotify.ClientId;
                    options.ClientSecret = spotify.ClientSecret;
                    options.CallbackPath = "/signin-oidc";
                    options.SaveTokens = true;

                    options.Scope.Clear();
                    options.Scope.Add("user-read-private");
                    options.Scope.Add("user-read-email");

                    //https://developer.spotify.com/documentation/general/guides/authorization/scopes/
                })
            ;

            services
                .AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("{**slug}", "Index", "Home");
            });
        }
    }
}
