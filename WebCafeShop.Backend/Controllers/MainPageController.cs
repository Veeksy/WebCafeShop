using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebCafeShop.Backend.Models;

namespace webapi.Controllers;

[ApiController]
[Route("MainPage")]
public class MainPageController : ControllerBase
{
    private readonly DbCafeOrderContext _db;

    public MainPageController(DbCafeOrderContext context)
    {
        _db = context;
    }

    [HttpGet("GetMainPage")]
    public async Task<IActionResult> GetMainPage()
    {
        return new JsonResult("");
    }

}
