using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WasteManagementApi.Models;

namespace WasteManagementApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>
    {

        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<AdminStaff> AdminStaff { get; set; }
        public DbSet<HelperStaff> HelperStaff { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            List<IdentityRole> roles = new List<IdentityRole>{
                new IdentityRole{
                    Id="f7e8f3d0-308b-4751-b970-245527c2b7fb",
                    Name ="Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole{
                    Id ="66c9da02-c442-4559-83a8-63a287da0343",
                    Name="Client",
                    NormalizedName ="CLIENT"
                },
                new IdentityRole{
                    Id ="71588004-3a06-4b9c-b033-45c62ffa98c1",
                    Name="Driver",
                    NormalizedName ="DRIVER"
                },
                new IdentityRole
                {
                    Id = "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6", 
                    Name = "Helper",
                    NormalizedName = "HELPER"
                }

            };
            builder.Entity<IdentityRole>().HasData(roles);

        }


    }
}
