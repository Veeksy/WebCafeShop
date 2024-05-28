using System;
using System.Collections.Generic;

namespace WebCafeShop.Backend.Models;

public partial class TBUser
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Surname { get; set; }

    public string? Phone { get; set; }

    public DateTime? Birthday { get; set; }

    public string? Role { get; set; }
}
