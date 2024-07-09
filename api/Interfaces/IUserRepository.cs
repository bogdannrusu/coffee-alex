using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task AddUserAsync(User user);
        Task SaveChangesAsync();
    }
}
