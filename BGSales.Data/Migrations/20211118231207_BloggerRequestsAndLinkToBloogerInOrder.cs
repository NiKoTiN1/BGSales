using Microsoft.EntityFrameworkCore.Migrations;

namespace BGSales.Data.Migrations
{
    public partial class BloggerRequestsAndLinkToBloogerInOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BloggerId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderId",
                table: "Bloggers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BloggerId",
                table: "Orders",
                column: "BloggerId");

            migrationBuilder.CreateIndex(
                name: "IX_Bloggers_OrderId",
                table: "Bloggers",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bloggers_Orders_OrderId",
                table: "Bloggers",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Bloggers_BloggerId",
                table: "Orders",
                column: "BloggerId",
                principalTable: "Bloggers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bloggers_Orders_OrderId",
                table: "Bloggers");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Bloggers_BloggerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_BloggerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Bloggers_OrderId",
                table: "Bloggers");

            migrationBuilder.DropColumn(
                name: "BloggerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Bloggers");
        }
    }
}
