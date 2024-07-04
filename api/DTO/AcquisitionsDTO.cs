using System;
using System.Linq;
using System.Collections.Generic;

namespace api.Models{
    public class AcquisitionsDTO{
        public int Id { get; set; }
        public string TypeBlank { get; set; }
        public string NrAcquisitions { get; set; }
        public DateTime dateEntry { get; set; }
        public string Contragent { get; set; }
        public decimal DepositEntry { get; set; }
        public decimal SumEntry { get; set; }
        public decimal SumTVA { get; set; }
        public int UserId { get; set; }
        
    }
}