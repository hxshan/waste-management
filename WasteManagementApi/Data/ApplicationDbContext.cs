using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WasteManagementApi.Models;

namespace WasteManagementApi.Data
{
    public class ApplicationDbContext:IdentityDbContext<User, IdentityRole, string>
    {

        public ApplicationDbContext(DbContextOptions dbContextOptions):base(dbContextOptions)
        {   

        }
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
                    Name="User",
                    NormalizedName ="USER"
                },
                new IdentityRole{
                    Id ="71588004-3a06-4b9c-b033-45c62ffa98c1",
                    Name="Driver",
                    NormalizedName ="DRIVER"
                },

            };
            builder.Entity<IdentityRole>().HasData(roles);

        }



    }
}
