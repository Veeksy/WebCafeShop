using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using WebCafeShop.Backend.Models;

namespace webapi.Controllers;

[Route("product")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly DbCafeOrderContext _db;

    public ProductController(DbCafeOrderContext context)
    {
        _db = context;
    }

    [HttpGet("GetProductList")]
    public async Task<IActionResult> GetProductList(int page)
    {
        Dictionary<string, object> data = new();
        var products = await _db.TBProducts.AsNoTracking().ToListAsync();
        var count = products.Count;

        products = products.Skip((page - 1) * 10).Take(10).ToList();
        data.Add("data", products);
        data.Add("count", count);

        return new JsonResult(data);
    }

    [HttpGet("GetCountries")]
    public async Task<IActionResult> GetCountries()
    {
        var countries = await _db.TBCountries.AsNoTracking().ToListAsync();
        return new JsonResult(countries);
    }

    [HttpGet("GetProduct")]
    public async Task<IActionResult> GetProduct(int idProduct)
    {
        var product = await _db.TBProducts.AsNoTracking().Where(x => x.Id == idProduct).FirstOrDefaultAsync();
        if (product is null)
        {
            product = new();
        }
        return new JsonResult(product);
    }

    [HttpPost("SaveProduct")]
    public async Task<IActionResult> SaveProduct([FromBody] TBProduct product)
    {
        try
        {
            if (product.Id == 0)
                await _db.TBProducts.AddAsync(product);
            else
                _db.TBProducts.Update(product);
            await _db.SaveChangesAsync();

            return new JsonResult("Сохранено");
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    [HttpDelete("DeleteProduct")]
    public async Task<IActionResult> DeleteProduct(int idProduct)
    {
        try
        {
            var product = await _db.TBProducts.FirstOrDefaultAsync(x => x.Id == idProduct);
            if (product is not null)
                _db.TBProducts.Remove(product);
            await _db.SaveChangesAsync();

            return new JsonResult("Удалено");
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    [HttpPost("uploadFiles")]
    public async Task<IActionResult> uploadFiles(int idProduct, [FromForm] IFormFile uploadedFile)
    {
        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(),
                         "wwwroot/files", uploadedFile.FileName);

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                uploadedFile.CopyTo(stream);
            }
            byte[] data;
            using (Stream fs = new FileStream(path, FileMode.Open))
            {
                data = new byte[fs.Length];

                fs.Read(data, 0, data.Length);

                var product = await _db.TBProducts.AsNoTracking().Where(x=>x.Id ==  idProduct).FirstOrDefaultAsync();

                product.Photo = data;
                _db.TBProducts.Update(product);
                await _db.SaveChangesAsync();
            }
                return new JsonResult("");
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


}
