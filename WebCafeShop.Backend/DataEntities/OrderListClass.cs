using WebCafeShop.Backend.Models;

namespace WebCafeShop.Backend.DataEntities
{

    public class OrderDataSaveClass
    {
        public TBOrder? order { get; set; }
        public List<TBOrderList>? orderList { get; set;}
    }
    
}
