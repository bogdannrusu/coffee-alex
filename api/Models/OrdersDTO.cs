using System;
using System.Linq;
using System.Collections.Generic;

namespace api.Models{
    public class Orders{
        public int Id { get; set; }
        public int GoodId { get; set; }
        public decimal Quantity { get; set; }
        public int GoodPackageId { get; set; }
        public int UserId {get; set;}
        
    }
}