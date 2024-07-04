﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Models;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(CoffeeLeCoupageContext))]
    [Migration("20240704090839_UpdateDatabaseSchema")]
    partial class UpdateDatabaseSchema
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseCollation("utf8mb4_general_ci")
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.HasCharSet(modelBuilder, "utf8mb4");
            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Acquisition", b =>
                {
                    b.Property<int>("AcquisitionsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("acquisitions_id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("AcquisitionsId"));

                    b.Property<string>("Contragent")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("contragent");

                    b.Property<DateTime>("DateEntry")
                        .HasColumnType("datetime")
                        .HasColumnName("date_entry");

                    b.Property<decimal>("DepositEntry")
                        .HasPrecision(8, 2)
                        .HasColumnType("decimal(8,2)")
                        .HasColumnName("deposit_entry");

                    b.Property<string>("NrAcquisitions")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("nr_acquisitions");

                    b.Property<decimal>("SumEntry")
                        .HasPrecision(8, 2)
                        .HasColumnType("decimal(8,2)")
                        .HasColumnName("sum_entry");

                    b.Property<decimal>("SumTva")
                        .HasPrecision(8, 2)
                        .HasColumnType("decimal(8,2)")
                        .HasColumnName("sum_tva");

                    b.Property<string>("TypeBlank")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)")
                        .HasColumnName("type_blank");

                    b.Property<int>("UserId")
                        .HasColumnType("int(11)")
                        .HasColumnName("user_id");

                    b.HasKey("AcquisitionsId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "UserId" }, "FK_acquisitions_user_id");

                    b.ToTable("acquisitions", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "utf8");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "utf8_general_ci");
                });

            modelBuilder.Entity("api.Models.AcquisitionsDetail", b =>
                {
                    b.Property<int>("DetailId")
                        .HasColumnType("int(11)")
                        .HasColumnName("detail_id");

                    b.Property<int>("AcquisitionsId")
                        .HasColumnType("int(11)")
                        .HasColumnName("acquisitions_id");

                    b.Property<int>("GoodId")
                        .HasColumnType("int(11)")
                        .HasColumnName("good_id");

                    b.Property<int>("GoodPackageId")
                        .HasColumnType("int(11)")
                        .HasColumnName("good_package_id");

                    b.HasKey("DetailId")
                        .HasName("PRIMARY");

                    b.ToTable("acquisitions_details", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "utf8");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "utf8_general_ci");
                });

            modelBuilder.Entity("api.Models.Contragent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("comment");

                    b.Property<string>("CrName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("cr_name");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("full_name");

                    b.Property<string>("Idno")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("idno");

                    b.Property<bool>("IsPartnership")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("is_partnership");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("contragent", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "utf8");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "utf8_general_ci");
                });

            modelBuilder.Entity("api.Models.Efmigrationshistory", b =>
                {
                    b.Property<string>("MigrationId")
                        .HasMaxLength(150)
                        .HasColumnType("varchar(150)");

                    b.Property<string>("ProductVersion")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("varchar(32)");

                    b.HasKey("MigrationId")
                        .HasName("PRIMARY");

                    b.ToTable("__efmigrationshistory", (string)null);
                });

            modelBuilder.Entity("api.Models.Good", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsPackaged")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("is_packaged");

                    b.Property<bool>("IsSemifinished")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("is_semifinished");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<string>("Origin")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("origin");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("goods", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "latin1");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "latin1_swedish_ci");
                });

            modelBuilder.Entity("api.Models.GoodPackage", b =>
                {
                    b.Property<int>("GoodPackageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("good_package_id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("GoodPackageId"));

                    b.Property<int>("GoodId")
                        .HasColumnType("int(11)")
                        .HasColumnName("good_id");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("is_active");

                    b.Property<int>("PackId")
                        .HasColumnType("int(11)")
                        .HasColumnName("pack_id");

                    b.HasKey("GoodPackageId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "GoodId" }, "FK_good_package_good_id");

                    b.HasIndex(new[] { "PackId" }, "FK_good_package_pack_id");

                    b.ToTable("good_package", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "utf8");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "utf8_general_ci");
                });

            modelBuilder.Entity("api.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GoodId")
                        .HasColumnType("int(11)")
                        .HasColumnName("good_id");

                    b.Property<int?>("GoodPackageId")
                        .HasColumnType("int(11)")
                        .HasColumnName("good_package_id");

                    b.Property<decimal>("Quantity")
                        .HasPrecision(8, 2)
                        .HasColumnType("decimal(8,2)")
                        .HasColumnName("quantity");

                    b.Property<int?>("UserId")
                        .HasColumnType("int(11)")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "GoodId" }, "FK_orders_good_id");

                    b.HasIndex(new[] { "UserId" }, "user_id");

                    b.ToTable("orders", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "latin1");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "latin1_swedish_ci");
                });

            modelBuilder.Entity("api.Models.Package", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("GrossWeight")
                        .HasPrecision(8, 2)
                        .HasColumnType("decimal(8,2)")
                        .HasColumnName("gross_weight");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("is_active");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("packages", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "utf8");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "utf8_general_ci");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(11)")
                        .HasColumnName("id");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<sbyte>("IsActive")
                        .HasColumnType("tinyint(4)")
                        .HasColumnName("is_active");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("username");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "Username" }, "username")
                        .IsUnique();

                    b.ToTable("users", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "latin1");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "latin1_swedish_ci");
                });

            modelBuilder.Entity("api.Models.Workpoint", b =>
                {
                    b.Property<int>("PointId")
                        .HasColumnType("int(11)")
                        .HasColumnName("point_id");

                    b.Property<int>("UserId")
                        .HasColumnType("int(11)")
                        .HasColumnName("user_id");

                    b.Property<string>("WpAddress")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("wp_address");

                    b.Property<string>("WpIp")
                        .HasMaxLength(16)
                        .HasColumnType("varchar(16)")
                        .HasColumnName("wp_ip");

                    b.Property<string>("WpName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("wp_name");

                    b.HasKey("PointId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "UserId" }, "FK_workpoints_user_id");

                    b.ToTable("workpoints", (string)null);

                    MySqlEntityTypeBuilderExtensions.HasCharSet(b, "utf8");
                    MySqlEntityTypeBuilderExtensions.UseCollation(b, "utf8_general_ci");
                });

            modelBuilder.Entity("api.Models.Acquisition", b =>
                {
                    b.HasOne("api.Models.User", "User")
                        .WithMany("Acquisitions")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_acquisitions_user_id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.GoodPackage", b =>
                {
                    b.HasOne("api.Models.Good", "Good")
                        .WithMany("GoodPackages")
                        .HasForeignKey("GoodId")
                        .IsRequired()
                        .HasConstraintName("FK_good_package_good_id");

                    b.HasOne("api.Models.Package", "Pack")
                        .WithMany("GoodPackages")
                        .HasForeignKey("PackId")
                        .IsRequired()
                        .HasConstraintName("FK_good_package_pack_id");

                    b.Navigation("Good");

                    b.Navigation("Pack");
                });

            modelBuilder.Entity("api.Models.Order", b =>
                {
                    b.HasOne("api.Models.Good", "Good")
                        .WithMany("Orders")
                        .HasForeignKey("GoodId")
                        .IsRequired()
                        .HasConstraintName("FK_orders_good_id");

                    b.HasOne("api.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .HasConstraintName("orders_ibfk_1");

                    b.Navigation("Good");

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.Workpoint", b =>
                {
                    b.HasOne("api.Models.User", "User")
                        .WithMany("Workpoints")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_workpoints_user_id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("api.Models.Good", b =>
                {
                    b.Navigation("GoodPackages");

                    b.Navigation("Orders");
                });

            modelBuilder.Entity("api.Models.Package", b =>
                {
                    b.Navigation("GoodPackages");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Navigation("Acquisitions");

                    b.Navigation("Orders");

                    b.Navigation("Workpoints");
                });
#pragma warning restore 612, 618
        }
    }
}
