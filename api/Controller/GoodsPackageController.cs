using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
public class GoodsPackageController : ControllerBase
{
    private readonly CoffeeLeCoupageContext _context;

        public GoodsPackageController(CoffeeLeCoupageContext context)
        {
            _context = context;
        }
      [HttpGet]
      public async Task<ActionResult<IEnumerable<GoodPackage>>> GetAllGoodsPackages()
        {
            return await _context.GoodPackages.ToListAsync();
        }

}
}


