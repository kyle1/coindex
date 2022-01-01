using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crypto.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace Crypto
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //CORS info:
            //https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-5.0
            var origins = new string[3] { "http://localhost:4200", "http://localhost:3000", "https://localhost:3000" };
            services.AddCors(options =>
            {
                // options.AddPolicy(MyAllowSpecificOrigins, builder =>
                // {
                //     builder
                //         .WithOrigins(origins)
                //         .AllowAnyMethod()
                //         .AllowAnyHeader();
                // });
                //Attempting to get past CORS error...
                //Source: https://stackoverflow.com/questions/59471861/access-to-xmlhttprequest-from-origin-has-been-blocked-by-cors-policy-no-access
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .WithOrigins("http://localhost:4200", "http://localhost:3000", "https://localhost:3000");
                });
            });

            // services.AddSingleton<IAssetsRepository, InMemAssetsRepository>();
            services.AddSingleton<IAssetsRepository, AssetsRepository>();
            services.AddSingleton<IAssetTagsRepository, AssetTagsRepository>();
            
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Crypto", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Crypto v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
