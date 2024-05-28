using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebCafeShop.Backend.Models;

public partial class TBOrderList
{
    public int Id { get; set; }

    public int? IdProduct { get; set; }

    public int? IdOrder { get; set; }

    public decimal? Cost { get; set; }

    public int? Count { get; set; }
    [NotMapped] 
    public string? ProductName { get; set; }
}
