using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WasteManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class basemodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "AddressLatitude",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "AddressLongitude",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "AssignedAreaLat",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "AssignedAreaLng",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "AssignedAreaRadius",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Driver_TruckId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TruckId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Bin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxWasteCap = table.Column<float>(type: "real", nullable: false),
                    CurrentWasteLevel = table.Column<float>(type: "real", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BinType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bin", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bin_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Truck",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LicensePlate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TruckModel = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Truck", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CollectionRequest",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ScheduleDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LocationLongitude = table.Column<float>(type: "real", nullable: true),
                    LocationLatitude = table.Column<float>(type: "real", nullable: true),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    BinId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CollectionRequest_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CollectionRequest_Bin_BinId",
                        column: x => x.BinId,
                        principalTable: "Bin",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Driver_TruckId",
                table: "AspNetUsers",
                column: "Driver_TruckId",
                unique: true,
                filter: "[TruckId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TruckId",
                table: "AspNetUsers",
                column: "TruckId");

            migrationBuilder.CreateIndex(
                name: "IX_Bin_ClientId",
                table: "Bin",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionRequest_BinId",
                table: "CollectionRequest",
                column: "BinId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionRequest_ClientId",
                table: "CollectionRequest",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Truck_Driver_TruckId",
                table: "AspNetUsers",
                column: "Driver_TruckId",
                principalTable: "Truck",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Truck_TruckId",
                table: "AspNetUsers",
                column: "TruckId",
                principalTable: "Truck",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Truck_Driver_TruckId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Truck_TruckId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "CollectionRequest");

            migrationBuilder.DropTable(
                name: "Truck");

            migrationBuilder.DropTable(
                name: "Bin");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_Driver_TruckId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TruckId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AddressLatitude",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AddressLongitude",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AssignedAreaLat",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AssignedAreaLng",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AssignedAreaRadius",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Driver_TruckId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TruckId",
                table: "AspNetUsers");
        }
    }
}
