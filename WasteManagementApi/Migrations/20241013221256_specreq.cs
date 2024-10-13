using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WasteManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class specreq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactNo",
                table: "CollectionRequests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialInstructions",
                table: "CollectionRequests",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactNo",
                table: "CollectionRequests");

            migrationBuilder.DropColumn(
                name: "SpecialInstructions",
                table: "CollectionRequests");
        }
    }
}
