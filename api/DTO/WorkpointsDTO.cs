using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models{
    public class WorkpointsDTO{
        public int Id { get; set; }
        public string WpName {get; set;}
        public string WpAddress {get; set;}
        public int UserId {get; set;}
        public string WpIP {get; set;}
    }
}