using Microsoft.EntityFrameworkCore.Migrations;

namespace BGSales.Data.Migrations
{
    public partial class BalaseInStripeInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Balance",
                table: "StripeInfo",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "StripeInfo");
        }
    }
}
