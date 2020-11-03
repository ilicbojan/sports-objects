using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
  public partial class AddedReservationEntity : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "ReservationStatuses",
          columns: table => new
          {
            Id = table.Column<int>(nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            Status = table.Column<string>(maxLength: 50, nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_ReservationStatuses", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "Reservations",
          columns: table => new
          {
            Id = table.Column<int>(nullable: false),
            SportObjectId = table.Column<int>(nullable: false),
            UserId = table.Column<string>(nullable: false),
            StartTime = table.Column<TimeSpan>(nullable: false),
            EndTime = table.Column<TimeSpan>(nullable: false),
            Date = table.Column<DateTime>(nullable: false),
            Price = table.Column<int>(nullable: false),
            StatusId = table.Column<int>(nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Reservations", x => new { x.Id, x.SportObjectId, x.UserId });
            table.ForeignKey(
                      name: "FK_Reservations_SportObjects_SportObjectId",
                      column: x => x.SportObjectId,
                      principalTable: "SportObjects",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Reservations_ReservationStatuses_StatusId",
                      column: x => x.StatusId,
                      principalTable: "ReservationStatuses",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Reservations_AspNetUsers_UserId",
                      column: x => x.UserId,
                      principalTable: "AspNetUsers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          });

      migrationBuilder.CreateIndex(
          name: "IX_Reservations_SportObjectId",
          table: "Reservations",
          column: "SportObjectId");

      migrationBuilder.CreateIndex(
          name: "IX_Reservations_StatusId",
          table: "Reservations",
          column: "StatusId");

      migrationBuilder.CreateIndex(
          name: "IX_Reservations_UserId",
          table: "Reservations",
          column: "UserId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Reservations");

      migrationBuilder.DropTable(
          name: "ReservationStatuses");
    }
  }
}
