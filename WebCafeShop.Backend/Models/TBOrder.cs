using System;
using System.Collections.Generic;

namespace WebCafeShop.Backend.Models;

public partial class TBOrder
{
    public int Id { get; set; }

    public DateTime? DateOrder { get; set; }

    public DateTime? DateAccept { get; set; }

    public int? IdUser { get; set; }
}
