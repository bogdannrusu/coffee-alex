using System;
using System.Linq;
using System.Collections.Generic;

namespace api.Models{
    public class Orders{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        
    }
}