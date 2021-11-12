using Microsoft.EntityFrameworkCore.Migrations;

namespace BGSales.Data.Migrations
{
    public partial class BusinessmanAvatar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarId",
                table: "Businessmans",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Businessmans_AvatarId",
                table: "Businessmans",
                column: "AvatarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Businessmans_Images_AvatarId",
                table: "Businessmans",
                column: "AvatarId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businessmans_Images_AvatarId",
                table: "Businessmans");

            migrationBuilder.DropIndex(
                name: "IX_Businessmans_AvatarId",
                table: "Businessmans");

            migrationBuilder.DropColumn(
                name: "AvatarId",
                table: "Businessmans");
        }
    }
}
