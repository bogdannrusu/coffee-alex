using System;
using System.Collections.Generic;

namespace api.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public sbyte IsActive { get; set; }

    public virtual ICollection<Acquisition> Acquisitions { get; set; } = new List<Acquisition>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    public virtual ICollection<Workpoint> Workpoints { get; set; } = new List<Workpoint>();
}
