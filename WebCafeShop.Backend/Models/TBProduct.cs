using System;
using System.Collections.Generic;

namespace WebCafeShop.Backend.Models;

public partial class TBProduct
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? ExpirationDate { get; set; }

    public string? Weight { get; set; }

    public int? Count { get; set; }

    public int? Country { get; set; }

    public string? Description { get; set; }

    public byte[]? Photo { get; set; }
}
