using AutoMapper;
using BGSales.Data;
using BGSales.Data.Interfaces;
using BGSales.Data.Repositories;
using BGSales.Domain.Models;
using BGSales.Services.Interfaces;
using BGSales.Services.MapperProfiles;
using BGSales.Services.Services;
using BGSales.Web.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Stripe;
using System;
using System.Text;


namespace BGSales.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private readonly string policy = "AllowAnyOriginPolicy";
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<BGSStagingContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<BGSStagingContext>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["Authentication:ISSUER"],
                    ValidateAudience = true,
                    ValidAudience = Configuration["Authentication:AUDIENCE"],
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Authentication:KEY"])),
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddControllers();

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new ApplicationUserMappingProfile());
                mc.AddProfile(new TokenMappingProfile());
                mc.AddProfile(new BusinessmanMappingProfile());
                mc.AddProfile(new BloggerMappingProfile());
                mc.AddProfile(new ImageMappingProfile());
                mc.AddProfile(new OrderMappingProfile());
                mc.AddProfile(new ChatMappingProfile());
            });

            var mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddCors(Options =>
            {
                Options.AddPolicy(policy,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });

            services.AddTransient<IAccountService, Services.Services.AccountService>();

            services.AddTransient<ITokenService, Services.Services.TokenService>();
            services.AddTransient<IRefreshTokenRepository, RefreshTokenRepository>();

            services.AddTransient<IBusinessmanRepository, BusinessmanRepository>();
            services.AddTransient<IBusinessmanService, BusinessmanService>();

            services.AddTransient<IBloggerRepository, BloggerRepository>();
            services.AddTransient<IBloggerService, BloggerService>();

            services.AddTransient<IImageRepository, ImageRepository>();
            services.AddTransient<IImageService, ImageService>();

            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IOrderService, Services.Services.OrderService>();

            services.AddTransient<IChatRepository, ChatRepository>();
            services.AddTransient<IChatService, ChatService>();

            services.AddSingleton<IConfiguration>(provider => Configuration);

            services.Configure<StripeSettings>(Configuration.GetSection("Stripe"));

            services.AddSignalR();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BGSales.Web", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            StripeConfiguration.ApiKey = Configuration["Stripe:SecretKey"];
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BGSales.Web v1"));
            }

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(policy);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatsocket");
            });
        }
    }
}
