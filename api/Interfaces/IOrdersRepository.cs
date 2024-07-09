using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId);
        Task<Order> GetOrderByIdAsync(int id, int userId);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(Order order);
        Task SaveChangesAsync();
    }
}
