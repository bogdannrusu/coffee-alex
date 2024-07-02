using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace api.Models{
    public class Goods{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Origin { get; set; }
        public bool? is_semifinished { get; set; }
        
    }
}