using System;
using System.Collections.Generic;

namespace api.Models;

public partial class GoodPackage
{
    public int GoodPackageId { get; set; }

    public int GoodId { get; set; }

    public int PackId { get; set; }

    public bool IsActive { get; set; }

    public virtual Good Good { get; set; } = null!;

    public virtual Package Pack { get; set; } = null!;
}
