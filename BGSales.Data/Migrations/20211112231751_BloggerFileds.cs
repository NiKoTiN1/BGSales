using Microsoft.EntityFrameworkCore.Migrations;

namespace BGSales.Data.Migrations
{
    public partial class BloggerFileds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Activity",
                table: "Bloggers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AgeAudience",
                table: "Bloggers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Subjects",
                table: "Bloggers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Subscribers",
                table: "Bloggers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Activity",
                table: "Bloggers");

            migrationBuilder.DropColumn(
                name: "AgeAudience",
                table: "Bloggers");

            migrationBuilder.DropColumn(
                name: "Subjects",
                table: "Bloggers");

            migrationBuilder.DropColumn(
                name: "Subscribers",
                table: "Bloggers");
        }
    }
}
