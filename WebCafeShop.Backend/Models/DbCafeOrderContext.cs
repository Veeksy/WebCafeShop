using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebCafeShop.Backend.Models;

public partial class DbCafeOrderContext : DbContext
{
    public DbCafeOrderContext()
    {
    }

    public DbCafeOrderContext(DbContextOptions<DbCafeOrderContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TBCountry> TBCountries { get; set; }

    public virtual DbSet<TBOrder> TBOrders { get; set; }

    public virtual DbSet<TBOrderList> TBOrderLists { get; set; }

    public virtual DbSet<TBPermission> TBPermissions { get; set; }

    public virtual DbSet<TBProduct> TBProducts { get; set; }

    public virtual DbSet<TBUser> TBUsers { get; set; }

    public virtual DbSet<TBUserPermission> TBUserPermissions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=dbCafeOrder;Trusted_Connection=True;TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TBCountry>(entity =>
        {
            entity.ToTable("tB_country");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Country)
                .HasMaxLength(150)
                .HasColumnName("country");
        });

        modelBuilder.Entity<TBOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Table_1");

            entity.ToTable("tB_orders");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DateAccept)
                .HasColumnType("date")
                .HasColumnName("dateAccept");
            entity.Property(e => e.DateOrder)
                .HasColumnType("date")
                .HasColumnName("dateOrder");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
        });

        modelBuilder.Entity<TBOrderList>(entity =>
        {
            entity.ToTable("tB_orderList");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cost)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("cost");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.IdOrder).HasColumnName("idOrder");
            entity.Property(e => e.IdProduct).HasColumnName("idProduct");
        });

        modelBuilder.Entity<TBPermission>(entity =>
        {
            entity.ToTable("tB_permission");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.PermissionName).HasMaxLength(50);
        });

        modelBuilder.Entity<TBProduct>(entity =>
        {
            entity.ToTable("tB_products");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.Country).HasColumnName("country");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.ExpirationDate)
                .HasMaxLength(20)
                .HasColumnName("expirationDate");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .HasColumnName("name");
            entity.Property(e => e.Photo)
                .HasColumnType("image")
                .HasColumnName("photo");
            entity.Property(e => e.Weight)
                .HasMaxLength(20)
                .HasColumnName("weight");
        });

        modelBuilder.Entity<TBUser>(entity =>
        {
            entity.ToTable("tB_users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Birthday)
                .HasColumnType("date")
                .HasColumnName("birthday");
            entity.Property(e => e.Firstname)
                .HasMaxLength(150)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(150)
                .HasColumnName("lastname");
            entity.Property(e => e.Password)
                .HasMaxLength(150)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .HasColumnName("role");
            entity.Property(e => e.Surname)
                .HasMaxLength(150)
                .HasColumnName("surname");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<TBUserPermission>(entity =>
        {
            entity.ToTable("tB_userPermission");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdPerm).HasColumnName("idPerm");
            entity.Property(e => e.IdUser).HasColumnName("idUser");
            entity.Property(e => e.PAdd).HasColumnName("p_add");
            entity.Property(e => e.PDelete).HasColumnName("p_delete");
            entity.Property(e => e.PEdit).HasColumnName("p_edit");
            entity.Property(e => e.PRead).HasColumnName("p_read");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
