using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Good
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Origin { get; set; }

    public bool IsSemifinished { get; set; }

    public bool IsPackaged { get; set; }

    public virtual ICollection<GoodPackage> GoodPackages { get; set; } = new List<GoodPackage>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
