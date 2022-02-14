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
                .AddCookie(options => {
                    options.Events = new CookieAuthenticationEvents
                    {
                        OnValidatePrincipal = context =>
                        {

                            //context.RejectPrincipal();
                            if (context.Properties.Items.ContainsKey(".Token.expires_at"))
                            {
                                var expire = DateTime.Parse(context.Properties.Items[".Token.expires_at"]);
                                var expirteLimit = expire.AddMinutes(-5);
                                var now = DateTime.Now;
                                if (now > expirteLimit) //TODO:change to check expires in next 5 mintues.
                                {
                                    // Log.Debug($"Access token has expired, user: {context.HttpContext.User.Identity.Name}");

                                    //var restClient = new RestSharp.RestClient(tractionConfig.BaseUrl);
                                    //var restRequest = new RestSharp.RestRequest($"/connect/token", RestSharp.Method.POST);

                                    //restRequest.AddParameter("grant_type", "refresh_token");
                                    //restRequest.AddParameter("client_id", tractionConfig.ClientId);
                                    //restRequest.AddParameter("client_secret", tractionConfig.ClientSecret);
                                    //restRequest.AddParameter("refresh_token", context.Properties.Items[".Token.refresh_token"]);

                                    //var restResponse = restClient.Execute<AuthenticationHelper.AuthenticationResponse>(restRequest);

                                    //if (restResponse.IsSuccessful && restResponse.Data != null)
                                    //{
                                    //    var expiresAt = now.AddSeconds(restResponse.Data.ExpiresIn).ToString("yyyy-MM-ddTHH:mm:ss.ffffffzzz");

                                    //    context.Properties.Items[".Token.expires_at"] = expiresAt;
                                    //    context.Properties.Items[".Token.access_token"] = restResponse.Data.AccessToken;
                                    //    context.ShouldRenew = true;
                                    //}

                                    context.RejectPrincipal();
                                }
                            }
                            return Task.FromResult(0);
                        }
                    };
                })
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
