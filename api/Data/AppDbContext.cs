using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Orders> Orders { get; set; } 
        public DbSet<Acquisitions> Acquisitions { get; set; }
        public DbSet<AcquisitionDetail> AcquisitionDetail {get; set;}
        public DbSet<Contragents> Contragents {get; set;}
        public DbSet<Goods> Goods {get; set;}
        public DbSet<GoodsPackages> GoodsPackages {get; set;}
        public DbSet<Packages> Packages {get; set;}
        public DbSet<Workpoints> Workpoints {get; set;}

    }
}
