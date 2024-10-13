﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WasteManagementApi.Data;

#nullable disable

namespace WasteManagementApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CollectionHelperStaff", b =>
                {
                    b.Property<int>("CollectionId")
                        .HasColumnType("int");

                    b.Property<string>("HelperStaffId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CollectionId", "HelperStaffId");

                    b.HasIndex("HelperStaffId");

                    b.ToTable("CollectionHelperStaff");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "f7e8f3d0-308b-4751-b970-245527c2b7fb",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "66c9da02-c442-4559-83a8-63a287da0343",
                            Name = "Client",
                            NormalizedName = "CLIENT"
                        },
                        new
                        {
                            Id = "71588004-3a06-4b9c-b033-45c62ffa98c1",
                            Name = "Driver",
                            NormalizedName = "DRIVER"
                        },
                        new
                        {
                            Id = "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
                            Name = "Helper",
                            NormalizedName = "HELPER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("WasteManagementApi.Models.Bin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BinType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClientId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("CurrentWasteLevel")
                        .HasColumnType("real");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("MaxWasteCap")
                        .HasColumnType("real");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Bins");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Collection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CollectionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CollectionRequestId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("DriverId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("RequestId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int>("TruckId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CollectionRequestId");

                    b.HasIndex("DriverId");

                    b.HasIndex("TruckId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("WasteManagementApi.Models.CollectionRequest", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(21)
                        .HasColumnType("nvarchar(21)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("LocationLatitude")
                        .HasColumnType("real");

                    b.Property<float?>("LocationLongitude")
                        .HasColumnType("real");

                    b.Property<DateTime>("ScheduleDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("CollectionRequests");

                    b.HasDiscriminator().HasValue("CollectionRequest");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("WasteManagementApi.Models.Truck", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("LicensePlate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TruckModel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Trucks");
                });

            modelBuilder.Entity("WasteManagementApi.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("MiddleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NIC")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator().HasValue("User");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("WasteManagementApi.Models.NormalRequest", b =>
                {
                    b.HasBaseType("WasteManagementApi.Models.CollectionRequest");

                    b.Property<int>("BinId")
                        .HasColumnType("int");

                    b.HasIndex("BinId");

                    b.HasDiscriminator().HasValue("NormalRequest");
                });

            modelBuilder.Entity("WasteManagementApi.Models.SpecialRequest", b =>
                {
                    b.HasBaseType("WasteManagementApi.Models.CollectionRequest");

                    b.Property<string>("ContactNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Quantity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpecialInstructions")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WasteType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("SpecialRequest");
                });

            modelBuilder.Entity("WasteManagementApi.Models.AdminStaff", b =>
                {
                    b.HasBaseType("WasteManagementApi.Models.User");

                    b.Property<DateTime?>("DateOfHire")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfResignation")
                        .HasColumnType("datetime2");

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmergencyContact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<decimal?>("Salary")
                        .HasColumnType("decimal(18,2)");

                    b.ToTable("AspNetUsers", t =>
                        {
                            t.Property("DateOfHire")
                                .HasColumnName("AdminStaff_DateOfHire");

                            t.Property("DateOfResignation")
                                .HasColumnName("AdminStaff_DateOfResignation");

                            t.Property("Department")
                                .HasColumnName("AdminStaff_Department");

                            t.Property("EmergencyContact")
                                .HasColumnName("AdminStaff_EmergencyContact");

                            t.Property("IsActive")
                                .HasColumnName("AdminStaff_IsActive");

                            t.Property("Salary")
                                .HasColumnName("AdminStaff_Salary");
                        });

                    b.HasDiscriminator().HasValue("AdminStaff");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Client", b =>
                {
                    b.HasBaseType("WasteManagementApi.Models.User");

                    b.Property<float?>("AddressLatitude")
                        .HasColumnType("real");

                    b.Property<float?>("AddressLongitude")
                        .HasColumnType("real");

                    b.HasDiscriminator().HasValue("Client");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Driver", b =>
                {
                    b.HasBaseType("WasteManagementApi.Models.User");

                    b.Property<float>("AssignedAreaLat")
                        .HasColumnType("real");

                    b.Property<float>("AssignedAreaLng")
                        .HasColumnType("real");

                    b.Property<float>("AssignedAreaRadius")
                        .HasColumnType("real");

                    b.Property<DateTime?>("DateOfHire")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfResignation")
                        .HasColumnType("datetime2");

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmergencyContact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LicenceExpiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("LicenceType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LicenseNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Salary")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("TruckId")
                        .HasColumnType("int");

                    b.HasIndex("TruckId")
                        .IsUnique()
                        .HasFilter("[TruckId] IS NOT NULL");

                    b.ToTable("AspNetUsers", t =>
                        {
                            t.Property("DateOfHire")
                                .HasColumnName("Driver_DateOfHire");

                            t.Property("DateOfResignation")
                                .HasColumnName("Driver_DateOfResignation");

                            t.Property("Department")
                                .HasColumnName("Driver_Department");

                            t.Property("EmergencyContact")
                                .HasColumnName("Driver_EmergencyContact");

                            t.Property("IsActive")
                                .HasColumnName("Driver_IsActive");

                            t.Property("Salary")
                                .HasColumnName("Driver_Salary");

                            t.Property("TruckId")
                                .HasColumnName("Driver_TruckId");
                        });

                    b.HasDiscriminator().HasValue("Driver");
                });

            modelBuilder.Entity("WasteManagementApi.Models.HelperStaff", b =>
                {
                    b.HasBaseType("WasteManagementApi.Models.User");

                    b.Property<DateTime?>("DateOfHire")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfResignation")
                        .HasColumnType("datetime2");

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmergencyContact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<decimal?>("Salary")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("TruckId")
                        .HasColumnType("int");

                    b.HasIndex("TruckId");

                    b.HasDiscriminator().HasValue("HelperStaff");
                });

            modelBuilder.Entity("CollectionHelperStaff", b =>
                {
                    b.HasOne("WasteManagementApi.Models.Collection", null)
                        .WithMany()
                        .HasForeignKey("CollectionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WasteManagementApi.Models.HelperStaff", null)
                        .WithMany()
                        .HasForeignKey("HelperStaffId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("WasteManagementApi.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("WasteManagementApi.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WasteManagementApi.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("WasteManagementApi.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WasteManagementApi.Models.Bin", b =>
                {
                    b.HasOne("WasteManagementApi.Models.Client", "Client")
                        .WithMany("Bins")
                        .HasForeignKey("ClientId");

                    b.Navigation("Client");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Collection", b =>
                {
                    b.HasOne("WasteManagementApi.Models.CollectionRequest", "CollectionRequest")
                        .WithMany()
                        .HasForeignKey("CollectionRequestId");

                    b.HasOne("WasteManagementApi.Models.Driver", "Driver")
                        .WithMany("Collections")
                        .HasForeignKey("DriverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WasteManagementApi.Models.Truck", "Truck")
                        .WithMany("Collections")
                        .HasForeignKey("TruckId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CollectionRequest");

                    b.Navigation("Driver");

                    b.Navigation("Truck");
                });

            modelBuilder.Entity("WasteManagementApi.Models.CollectionRequest", b =>
                {
                    b.HasOne("WasteManagementApi.Models.Client", "Client")
                        .WithMany("CollectionRequests")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");
                });

            modelBuilder.Entity("WasteManagementApi.Models.NormalRequest", b =>
                {
                    b.HasOne("WasteManagementApi.Models.Bin", "Bin")
                        .WithMany("CollectionRequests")
                        .HasForeignKey("BinId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Bin");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Driver", b =>
                {
                    b.HasOne("WasteManagementApi.Models.Truck", "Truck")
                        .WithOne("Driver")
                        .HasForeignKey("WasteManagementApi.Models.Driver", "TruckId");

                    b.Navigation("Truck");
                });

            modelBuilder.Entity("WasteManagementApi.Models.HelperStaff", b =>
                {
                    b.HasOne("WasteManagementApi.Models.Truck", "Truck")
                        .WithMany("HelperStaff")
                        .HasForeignKey("TruckId");

                    b.Navigation("Truck");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Bin", b =>
                {
                    b.Navigation("CollectionRequests");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Truck", b =>
                {
                    b.Navigation("Collections");

                    b.Navigation("Driver");

                    b.Navigation("HelperStaff");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Client", b =>
                {
                    b.Navigation("Bins");

                    b.Navigation("CollectionRequests");
                });

            modelBuilder.Entity("WasteManagementApi.Models.Driver", b =>
                {
                    b.Navigation("Collections");
                });
#pragma warning restore 612, 618
        }
    }
}
