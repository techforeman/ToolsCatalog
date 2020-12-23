using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class SeedWeathers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "WeatherForecast",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 1, new DateTime(2020, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hot", 26 });

            migrationBuilder.InsertData(
                table: "WeatherForecast",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 2, new DateTime(2020, 1, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hot", 22 });

            migrationBuilder.InsertData(
                table: "WeatherForecast",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 3, new DateTime(2020, 1, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hot", 24 });

            migrationBuilder.InsertData(
                table: "WeatherForecast",
                columns: new[] { "Id", "Date", "Summary", "TemperatureC" },
                values: new object[] { 4, new DateTime(2020, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Hot", 29 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "WeatherForecast",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "WeatherForecast",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "WeatherForecast",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "WeatherForecast",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
