using System;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class GoodsPackages{
        public int Id { get; set; }
        public int GoodId { get; set; }
        public int PackageId { get; set; }
        public bool? is_active {get; set;}
    }
}