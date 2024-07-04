using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace api.Models{
    public class ContragentsDTO{
        public int Id { get; set; }
        public string Cr_Name { get; set; }
        public string IDNO { get; set; }
        public string Comment { get; set; }
        public string full_name { get; set; }
        public bool? is_partnership { get; set; }
    }
}