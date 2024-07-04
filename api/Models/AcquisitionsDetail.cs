using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AcquisitionsDetail
{
    public int DetailId { get; set; }

    public int AcquisitionsId { get; set; }

    public int GoodId { get; set; }

    public int GoodPackageId { get; set; }
}
