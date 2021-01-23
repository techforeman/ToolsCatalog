using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<WeatherForecast> WeatherForecast {get; set;}
        public DbSet<Tool> Tools {get; set;}


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<WeatherForecast>()
                .HasData(
                    new WeatherForecast{Id = 1, Date = System.DateTime.Parse("2020-01-12"), TemperatureC = 26, Summary = "Hot"  },
                    new WeatherForecast{Id = 2, Date = System.DateTime.Parse("2020-01-13"), TemperatureC = 22, Summary = "Hot"  },
                    new WeatherForecast{Id = 3, Date = System.DateTime.Parse("2020-01-14"), TemperatureC = 24, Summary = "Hot"  },
                    new WeatherForecast{Id = 4, Date = System.DateTime.Parse("2020-01-15"), TemperatureC = 29, Summary = "Hot"  }
                );
        }
    }
}


