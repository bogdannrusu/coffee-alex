using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Acquisition
{
    public int AcquisitionsId { get; set; }

    public string TypeBlank { get; set; } = null!;

    public string NrAcquisitions { get; set; } = null!;

    public DateTime DateEntry { get; set; }

    public string Contragent { get; set; } = null!;

    public decimal DepositEntry { get; set; }

    public decimal SumEntry { get; set; }

    public decimal SumTva { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
