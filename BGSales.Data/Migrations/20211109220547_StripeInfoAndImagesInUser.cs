using Microsoft.EntityFrameworkCore.Migrations;

namespace BGSales.Data.Migrations
{
    public partial class StripeInfoAndImagesInUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bloggers_Images_AvatarId",
                table: "Bloggers");

            migrationBuilder.DropForeignKey(
                name: "FK_Businessmans_Images_AvatarId",
                table: "Businessmans");

            migrationBuilder.DropIndex(
                name: "IX_Businessmans_AvatarId",
                table: "Businessmans");

            migrationBuilder.DropIndex(
                name: "IX_Bloggers_AvatarId",
                table: "Bloggers");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "Businessmans");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "Bloggers");

            migrationBuilder.AddColumn<string>(
                name: "AvatarId",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StripeInfoId",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StripeInfo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StripeId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCardAdded = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StripeInfo", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_AvatarId",
                table: "AspNetUsers",
                column: "AvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_StripeInfoId",
                table: "AspNetUsers",
                column: "StripeInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Images_AvatarId",
                table: "AspNetUsers",
                column: "AvatarId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_StripeInfo_StripeInfoId",
                table: "AspNetUsers",
                column: "StripeInfoId",
                principalTable: "StripeInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Images_AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_StripeInfo_StripeInfoId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "StripeInfo");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_StripeInfoId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StripeInfoId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "AvatarId",
                table: "Businessmans",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvatarId",
                table: "Bloggers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Businessmans_AvatarId",
                table: "Businessmans",
                column: "AvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_Bloggers_AvatarId",
                table: "Bloggers",
                column: "AvatarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bloggers_Images_AvatarId",
                table: "Bloggers",
                column: "AvatarId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Businessmans_Images_AvatarId",
                table: "Businessmans",
                column: "AvatarId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
