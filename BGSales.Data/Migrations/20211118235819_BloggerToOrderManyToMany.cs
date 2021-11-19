using Microsoft.EntityFrameworkCore.Migrations;

namespace BGSales.Data.Migrations
{
    public partial class BloggerToOrderManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bloggers_Orders_OrderId",
                table: "Bloggers");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Bloggers_BloggerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Bloggers_OrderId",
                table: "Bloggers");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Bloggers");

            migrationBuilder.CreateTable(
                name: "BloggerOrder",
                columns: table => new
                {
                    BloggerRequestsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OrdersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloggerOrder", x => new { x.BloggerRequestsId, x.OrdersId });
                    table.ForeignKey(
                        name: "FK_BloggerOrder_Bloggers_BloggerRequestsId",
                        column: x => x.BloggerRequestsId,
                        principalTable: "Bloggers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BloggerOrder_Orders_OrdersId",
                        column: x => x.OrdersId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BloggerOrder_OrdersId",
                table: "BloggerOrder",
                column: "OrdersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Bloggers_BloggerId",
                table: "Orders",
                column: "BloggerId",
                principalTable: "Bloggers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Bloggers_BloggerId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "BloggerOrder");

            migrationBuilder.AddColumn<string>(
                name: "OrderId",
                table: "Bloggers",
                type: "nvarchar(450)",
                nullable: true);

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
    }
}
