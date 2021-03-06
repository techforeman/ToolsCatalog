﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistance;

namespace Persistance.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20201223205159_SeedWeathers")]
    partial class SeedWeathers
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10");

            modelBuilder.Entity("Domain.WeatherForecast", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Summary")
                        .HasColumnType("TEXT");

                    b.Property<int>("TemperatureC")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("WeatherForecast");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Date = new DateTime(2020, 1, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Summary = "Hot",
                            TemperatureC = 26
                        },
                        new
                        {
                            Id = 2,
                            Date = new DateTime(2020, 1, 13, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Summary = "Hot",
                            TemperatureC = 22
                        },
                        new
                        {
                            Id = 3,
                            Date = new DateTime(2020, 1, 14, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Summary = "Hot",
                            TemperatureC = 24
                        },
                        new
                        {
                            Id = 4,
                            Date = new DateTime(2020, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Summary = "Hot",
                            TemperatureC = 29
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
