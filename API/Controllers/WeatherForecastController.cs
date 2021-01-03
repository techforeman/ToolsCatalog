using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {

    
        private readonly DataContext _context;

        public WeatherForecastController(DataContext context)
        {
            
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherForecast>>> Get()
        {
            var temps = await _context.WeatherForecast.ToListAsync();
            return Ok(temps);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherForecast>> Get(int id)
        {
            var temp = await _context.WeatherForecast.FindAsync(id);
            return Ok(temp);
        }
    }
}
