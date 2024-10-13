namespace WasteManagementApi.Models
{
    public class Client:User
    {
        public float? AddressLongitude { get; set; }
        public float? AddressLatitude{ get; set; }
        public ICollection<Bin>? Bins { get; set; }
        public ICollection<CollectionRequest>? CollectionRequests { get; set; }
    }
}
