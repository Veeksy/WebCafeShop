using System;
using System.Collections.Generic;

namespace WebCafeShop.Backend.Models;

public partial class TBUserPermission
{
    public int Id { get; set; }

    public int IdUser { get; set; }

    public int IdPerm { get; set; }

    public bool PRead { get; set; }

    public bool PEdit { get; set; }

    public bool PAdd { get; set; }

    public bool PDelete { get; set; }
}
