using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Role
{
    public int IdRole { get; set; }

    public string RoleName { get; set; } = null!;

    public bool IsDefault { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
