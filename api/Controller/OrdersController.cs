using Microsoft.AspNetCore.Mvc;
using api.Context;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace CoffeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder(Orders order)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            order.UserId = userId;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { order.Id, message = "Order created successfully" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var orders = await _context.Orders.Where(o => o.UserId == userId).ToListAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Orders>> GetOrder(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = await _context.Orders.SingleOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            return Ok(order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrder(int id, Orders updatedOrder)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = await _context.Orders.SingleOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            order.Quantity = updatedOrder.Quantity;

            await _context.SaveChangesAsync();

            return Ok("Order updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = await _context.Orders.SingleOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return Ok("Order deleted successfully");
        }
    }
}
