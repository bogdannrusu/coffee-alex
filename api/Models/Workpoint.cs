using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Workpoint
{
    public int PointId { get; set; }

    public string WpName { get; set; } = null!;

    public string WpAddress { get; set; } = null!;

    public int UserId { get; set; }

    public string? WpIp { get; set; }

    public virtual User User { get; set; } = null!;
}
