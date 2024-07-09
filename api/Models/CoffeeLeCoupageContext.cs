using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace api.Models;

public partial class CoffeeLeCoupageContext : DbContext
{
    public CoffeeLeCoupageContext()
    {
    }

    public CoffeeLeCoupageContext(DbContextOptions<CoffeeLeCoupageContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Acquisition> Acquisitions { get; set; }

    public virtual DbSet<AcquisitionsDetail> AcquisitionsDetails { get; set; }

    public virtual DbSet<Contragent> Contragents { get; set; }

    public virtual DbSet<Efmigrationshistory> Efmigrationshistories { get; set; }

    public virtual DbSet<Good> Goods { get; set; }

    public virtual DbSet<GoodPackage> GoodPackages { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Workpoint> Workpoints { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;database=coffee_le_coupage;user=root;password=Ban4ever!#;port=3305", Microsoft.EntityFrameworkCore.ServerVersion.Parse("5.7.40-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Acquisition>(entity =>
        {
            entity.HasKey(e => e.AcquisitionsId).HasName("PRIMARY");

            entity
                .ToTable("acquisitions")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.UserId, "FK_acquisitions_user_id");

            entity.Property(e => e.AcquisitionsId)
                .HasColumnType("int(11)")
                .HasColumnName("acquisitions_id");
            entity.Property(e => e.Contragent)
                .HasMaxLength(255)
                .HasColumnName("contragent");
            entity.Property(e => e.DateEntry)
                .HasColumnType("datetime")
                .HasColumnName("date_entry");
            entity.Property(e => e.DepositEntry)
                .HasPrecision(8, 2)
                .HasColumnName("deposit_entry");
            entity.Property(e => e.NrAcquisitions)
                .HasMaxLength(100)
                .HasColumnName("nr_acquisitions");
            entity.Property(e => e.SumEntry)
                .HasPrecision(8, 2)
                .HasColumnName("sum_entry");
            entity.Property(e => e.SumTva)
                .HasPrecision(8, 2)
                .HasColumnName("sum_tva");
            entity.Property(e => e.TypeBlank)
                .HasMaxLength(10)
                .HasColumnName("type_blank");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Acquisitions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_acquisitions_user_id");
        });

        modelBuilder.Entity<AcquisitionsDetail>(entity =>
        {
            entity.HasKey(e => e.DetailId).HasName("PRIMARY");

            entity
                .ToTable("acquisitions_details")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.DetailId)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("detail_id");
            entity.Property(e => e.AcquisitionsId)
                .HasColumnType("int(11)")
                .HasColumnName("acquisitions_id");
            entity.Property(e => e.GoodId)
                .HasColumnType("int(11)")
                .HasColumnName("good_id");
            entity.Property(e => e.GoodPackageId)
                .HasColumnType("int(11)")
                .HasColumnName("good_package_id");
        });

        modelBuilder.Entity<Contragent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("contragent")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .HasColumnName("comment");
            entity.Property(e => e.CrName)
                .HasMaxLength(255)
                .HasColumnName("cr_name");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.Idno)
                .HasMaxLength(255)
                .HasColumnName("idno");
            entity.Property(e => e.IsPartnership).HasColumnName("is_partnership");
        });

        modelBuilder.Entity<Efmigrationshistory>(entity =>
        {
            entity.HasKey(e => e.MigrationId).HasName("PRIMARY");

            entity.ToTable("__efmigrationshistory");

            entity.Property(e => e.MigrationId).HasMaxLength(150);
            entity.Property(e => e.ProductVersion).HasMaxLength(32);
        });

        modelBuilder.Entity<Good>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("goods")
                .HasCharSet("latin1")
                .UseCollation("latin1_swedish_ci");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsPackaged).HasColumnName("is_packaged");
            entity.Property(e => e.IsSemifinished).HasColumnName("is_semifinished");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Origin)
                .HasMaxLength(255)
                .HasColumnName("origin");
        });

        modelBuilder.Entity<GoodPackage>(entity =>
        {
            entity.HasKey(e => e.GoodPackageId).HasName("PRIMARY");

            entity
                .ToTable("good_package")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.GoodId, "FK_good_package_good_id");

            entity.HasIndex(e => e.PackId, "FK_good_package_pack_id");

            entity.Property(e => e.GoodPackageId)
                .HasColumnType("int(11)")
                .HasColumnName("good_package_id");
            entity.Property(e => e.GoodId)
                .HasColumnType("int(11)")
                .HasColumnName("good_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.PackId)
                .HasColumnType("int(11)")
                .HasColumnName("pack_id");

            entity.HasOne(d => d.Good).WithMany(p => p.GoodPackages)
                .HasForeignKey(d => d.GoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_good_package_good_id");

            entity.HasOne(d => d.Pack).WithMany(p => p.GoodPackages)
                .HasForeignKey(d => d.PackId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_good_package_pack_id");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("orders")
                .HasCharSet("latin1")
                .UseCollation("latin1_swedish_ci");

            entity.HasIndex(e => e.GoodId, "FK_orders_good_id");

            entity.HasIndex(e => e.GoodPackageId, "FK_orders_good_package_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.GoodId)
                .HasColumnType("int(11)")
                .HasColumnName("good_id");
            entity.Property(e => e.GoodPackageId)
                .HasColumnType("int(11)")
                .HasColumnName("good_package_id");
            entity.Property(e => e.Quantity)
                .HasPrecision(8, 2)
                .HasColumnName("quantity");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.Good).WithMany(p => p.Orders)
                .HasForeignKey(d => d.GoodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_orders_good_id");

            entity.HasOne(d => d.GoodPackage).WithMany(p => p.Orders)
                .HasForeignKey(d => d.GoodPackageId)
                .HasConstraintName("FK_orders_good_package_id");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("orders_ibfk_1");
        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("packages")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.GrossWeight)
                .HasPrecision(8, 2)
                .HasColumnName("gross_weight");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRole).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.HasIndex(e => e.UserId, "FK_roles_user_id");

            entity.Property(e => e.IdRole)
                .HasColumnType("int(11)")
                .HasColumnName("id_role");
            entity.Property(e => e.IsDefault).HasColumnName("is_default");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .HasColumnName("role_name");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Roles)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_roles_user_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("users")
                .HasCharSet("latin1")
                .UseCollation("latin1_swedish_ci");

            entity.HasIndex(e => e.Username, "username").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.IsActive)
                .HasColumnType("tinyint(4)")
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Workpoint>(entity =>
        {
            entity.HasKey(e => e.PointId).HasName("PRIMARY");

            entity
                .ToTable("workpoints")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.UserId, "FK_workpoints_user_id");

            entity.Property(e => e.PointId)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("point_id");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.WpAddress)
                .HasMaxLength(100)
                .HasColumnName("wp_address");
            entity.Property(e => e.WpIp)
                .HasMaxLength(16)
                .HasColumnName("wp_ip");
            entity.Property(e => e.WpName)
                .HasMaxLength(100)
                .HasColumnName("wp_name");

            entity.HasOne(d => d.User).WithMany(p => p.Workpoints)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_workpoints_user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
