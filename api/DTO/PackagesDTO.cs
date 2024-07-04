using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models{
    public class PackagesDTO{
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal GrossWeight { get; set; }
        public bool? is_active { get; set;}
    }
}