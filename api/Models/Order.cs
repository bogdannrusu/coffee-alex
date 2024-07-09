using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Order
{
    public int Id { get; set; }

    public int GoodId { get; set; }

    public decimal Quantity { get; set; }

    public int? GoodPackageId { get; set; }

    public int? UserId { get; set; }

    public virtual Good Good { get; set; } = null!;

    public virtual GoodPackage? GoodPackage { get; set; }

    public virtual User? User { get; set; }
}
