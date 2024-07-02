using System;
using System.Linq;
using System.Collections.Generic;

namespace api.Models{
    public class Acquisitions{
        public int Id { get; set; }
        public string type_blank { get; set; }
        public string nr_acquisitions { get; set; }
        public string date_entry { get; set; }
        public string contragent { get; set; }
        public string deposit_entry { get; set; }
        public string sum_entry { get; set; }
        public string sum_tva { get; set; }
        public string user_id { get; set; }
        
    }
}