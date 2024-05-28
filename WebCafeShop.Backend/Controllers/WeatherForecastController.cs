using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebCafeShop.Backend.Models;

namespace webapi.Controllers;

[ApiController]
[Route("BaseData")]
public class WeatherForecastController : ControllerBase
{
    private readonly DbCafeOrderContext _db;

    public WeatherForecastController(DbCafeOrderContext context)
    {
        _db = context;
    }

    [HttpGet("GetWeatherForecast")]
    public async Task<IActionResult> Get()
    {
            var products = await _db.TBProducts.AsNoTracking().ToListAsync();
            return new JsonResult(products);
    }
}
