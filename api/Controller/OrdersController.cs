using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using api.Interfaces;
using api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoffeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrdersController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder(Order order)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            order.UserId = userId;

            await _orderRepository.AddOrderAsync(order);
            await _orderRepository.SaveChangesAsync();

            return Ok(new { order.Id, message = "Order created successfully" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = await _orderRepository.GetOrderByIdAsync(id, userId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            return Ok(order);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrder(int id, Order updatedOrder)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = await _orderRepository.GetOrderByIdAsync(id, userId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            order.GoodId = updatedOrder.GoodId;
            order.Quantity = updatedOrder.Quantity;
            order.GoodPackageId = updatedOrder.GoodPackageId;

            await _orderRepository.UpdateOrderAsync(order);
            await _orderRepository.SaveChangesAsync();

            return Ok("Order updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var order = await _orderRepository.GetOrderByIdAsync(id, userId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            await _orderRepository.DeleteOrderAsync(order);
            await _orderRepository.SaveChangesAsync();

            return Ok("Order deleted successfully");
        }
    }
}
