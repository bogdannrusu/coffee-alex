using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Package
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal GrossWeight { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<GoodPackage> GoodPackages { get; set; } = new List<GoodPackage>();
}
