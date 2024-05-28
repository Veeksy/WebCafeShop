using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using WebCafeShop.Backend.DataEntities;
using WebCafeShop.Backend.Models;

namespace webapi.Controllers;

[Route("orders")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly DbCafeOrderContext _db;

    public OrdersController(DbCafeOrderContext context)
    {
        _db = context;
    }

    [HttpGet("GetOrders")]
    public async Task<IActionResult> GetOrders(int page)
    {
        Dictionary<string, object> data = new Dictionary<string, object>();

        var orders = await _db.TBOrders.AsNoTracking().Join(_db.TBUsers, x => x.IdUser, y => y.Id, (x, y) => new
        {
            Id = x.Id,
            DateOrder = x.DateOrder,
            DateAccept = x.DateAccept,
            User = y.Firstname + " " + y.Lastname + " " + y.Surname,
        }).ToListAsync();

        int count = orders.Count();

        orders = orders.Skip((page - 1) * 10).Take(10).ToList();

        data.Add("data", orders);
        data.Add("count", count);


        return new JsonResult(data);
    }


    [HttpGet("GetOrder")]
    public async Task<IActionResult> GetOrder(int idOrder)
    {
        var order = await  _db.TBOrders.AsNoTracking().Where(x=>x.Id ==  idOrder).FirstOrDefaultAsync();

        if (order is null)
            order = new();

        return new JsonResult(order);
    }

    [HttpGet("GetOrderProductList")]
    public async Task<IActionResult> GetOrderProductList(int idOrder)
    {
        var productList = await _db.TBOrderLists.AsNoTracking()
            .Where(x => x.IdOrder == idOrder).Join(_db.TBProducts, x=>x.IdProduct, y=>y.Id, (x, y) => new TBOrderList()
            {
                Id = x.Id,
                IdProduct = y.Id,
                IdOrder = idOrder,
                Cost = (int)x.Cost,
                Count = (int)x.Count,
                ProductName = y.Name,
            }).ToListAsync();

        return new JsonResult(productList);
    }

    [HttpGet("GetOrderProductListElement")]
    public async Task<IActionResult> GetOrderProductListElement()
    {
       var productList = new TBOrderList();

        return new JsonResult(productList);
    }

    [HttpGet("GetProductForOrder")]
    public async Task<IActionResult> GetProductForOrder()
    {
        var products = await _db.TBProducts.AsNoTracking().Select(x=> new ProductSelect()
        {
            value = x.Id,
            label = x.Name,
        }).ToListAsync();

        return new JsonResult(products);
    }

    [HttpPost("SaveOrder")]
    public async Task<IActionResult> SaveOrder([FromBody] OrderDataSaveClass orderData)
    {
        try
        {
            if (orderData.order.Id == 0)
                await _db.TBOrders.AddAsync(orderData.order);
            else
                 _db.TBOrders.Update(orderData.order);
            await _db.SaveChangesAsync();

            orderData.orderList?.ForEach(x=>x.IdOrder = orderData.order.Id);

            List<TBOrderList> newDataList = orderData?.orderList?.Where(x=>x.Id == 0).ToList();
            List<TBOrderList> oldDataList = orderData?.orderList?.Where(x => x.Id != 0).ToList();
            
            var ids = oldDataList.Select(y => y.Id).ToList();
            
            var deleted = await _db.TBOrderLists.Where(x=>x.IdOrder == orderData.order.Id 
            && !ids.Contains(x.Id)).ToListAsync();

            _db.TBOrderLists.AddRange(newDataList);
            _db.TBOrderLists.UpdateRange(oldDataList);
            _db.TBOrderLists.RemoveRange(deleted);

            await _db.SaveChangesAsync();

            return new JsonResult("Сохранено");
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
       
    }

}

