using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Contragent
{
    public int Id { get; set; }

    public string CrName { get; set; } = null!;

    public string Idno { get; set; } = null!;

    public string? Comment { get; set; }

    public string FullName { get; set; } = null!;

    public bool IsPartnership { get; set; }
}
