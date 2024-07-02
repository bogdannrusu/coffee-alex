using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace api.Models{
    public class AcquisitionsDetails{
        public int Id { get; set; }
        public int AcquisitionsId { get; set; }
        public int GoodId { get; set; }
        public int GoodPackageId { get; set; }
    }
}