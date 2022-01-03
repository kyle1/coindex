using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Crypto.Entities
{
    public partial class CryptoDbContext : DbContext
    {
        public CryptoDbContext()
        {
        }

        public CryptoDbContext(DbContextOptions<CryptoDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Asset> Assets { get; set; }
        public virtual DbSet<AssetCompetitor> AssetCompetitors { get; set; }
        public virtual DbSet<AssetEvent> AssetEvents { get; set; }
        public virtual DbSet<AssetLink> AssetLinks { get; set; }
        public virtual DbSet<AssetSection> AssetSections { get; set; }
        public virtual DbSet<AssetTag> AssetTags { get; set; }
        public virtual DbSet<AssetTagCategory> AssetTagCategories { get; set; }
        public virtual DbSet<AssetTagXref> AssetTagXrefs { get; set; }
        public virtual DbSet<PortfolioAsset> PortfolioAssets { get; set; }
        public virtual DbSet<Resource> Resources { get; set; }
        public virtual DbSet<ResourceGroup> ResourceGroups { get; set; }
        public virtual DbSet<SectionCategory> SectionCategories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=crypto;Username=postgres;Password=postgres");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

            modelBuilder.Entity<Asset>(entity =>
            {
                entity.ToTable("asset");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.AssetName)
                    .IsRequired()
                    .HasColumnName("asset_name");

                entity.Property(e => e.Subreddit).HasColumnName("subreddit");

                entity.Property(e => e.Ticker)
                    .IsRequired()
                    .HasColumnName("ticker");

                entity.Property(e => e.Website).HasColumnName("website");
            });

            modelBuilder.Entity<AssetCompetitor>(entity =>
            {
                entity.HasKey(e => e.AssetTagXrefId)
                    .HasName("asset_competitor_pkey");

                entity.ToTable("asset_competitor");

                entity.Property(e => e.AssetTagXrefId).HasColumnName("asset_tag_xref_id");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.CompetitorAssetId).HasColumnName("competitor_asset_id");

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetCompetitorAssets)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_competitor_asset_id_fkey");

                entity.HasOne(d => d.CompetitorAsset)
                    .WithMany(p => p.AssetCompetitorCompetitorAssets)
                    .HasForeignKey(d => d.CompetitorAssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_competitor_competitor_asset_id_fkey");
            });

            modelBuilder.Entity<AssetEvent>(entity =>
            {
                entity.HasKey(e => e.AssetTagXrefId)
                    .HasName("asset_event_pkey");

                entity.ToTable("asset_event");

                entity.Property(e => e.AssetTagXrefId).HasColumnName("asset_tag_xref_id");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.EventName)
                    .IsRequired()
                    .HasColumnName("event_name");

                entity.Property(e => e.IsConfirmed).HasColumnName("is_confirmed");

                entity.Property(e => e.IsStarred).HasColumnName("is_starred");

                entity.Property(e => e.Notes).HasColumnName("notes");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetEvents)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_event_asset_id_fkey");
            });

            modelBuilder.Entity<AssetLink>(entity =>
            {
                entity.ToTable("asset_link");

                entity.Property(e => e.AssetLinkId).HasColumnName("asset_link_id");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasColumnName("url");

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetLinks)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_link_asset_id_fkey");
            });

            modelBuilder.Entity<AssetSection>(entity =>
            {
                entity.ToTable("asset_section");

                entity.Property(e => e.AssetSectionId).HasColumnName("asset_section_id");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.Body)
                    .IsRequired()
                    .HasColumnName("body");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.SectionCategoryId).HasColumnName("section_category_id");

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetSections)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_section_asset_id_fkey");

                entity.HasOne(d => d.SectionCategory)
                    .WithMany(p => p.AssetSections)
                    .HasForeignKey(d => d.SectionCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_section_section_category_id_fkey");
            });

            modelBuilder.Entity<AssetTag>(entity =>
            {
                entity.ToTable("asset_tag");

                entity.Property(e => e.AssetTagId).HasColumnName("asset_tag_id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasColumnName("tag_name");
            });

            modelBuilder.Entity<AssetTagCategory>(entity =>
            {
                entity.ToTable("asset_tag_category");

                entity.Property(e => e.AssetTagCategoryId).HasColumnName("asset_tag_category_id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");
            });

            modelBuilder.Entity<AssetTagXref>(entity =>
            {
                entity.ToTable("asset_tag_xref");

                entity.Property(e => e.AssetTagXrefId).HasColumnName("asset_tag_xref_id");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.AssetTagId).HasColumnName("asset_tag_id");

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetTagXrefs)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_tag_xref_asset_id_fkey");

                entity.HasOne(d => d.AssetTag)
                    .WithMany(p => p.AssetTagXrefs)
                    .HasForeignKey(d => d.AssetTagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("asset_tag_xref_asset_tag_id_fkey");
            });

            modelBuilder.Entity<PortfolioAsset>(entity =>
            {
                entity.ToTable("portfolio_asset");

                entity.Property(e => e.PortfolioAssetId).HasColumnName("portfolio_asset_id");

                entity.Property(e => e.AssetId).HasColumnName("asset_id");

                entity.Property(e => e.BuyReason).HasColumnName("buy_reason");

                entity.Property(e => e.ConvictionRating).HasColumnName("conviction_rating");

                entity.Property(e => e.HoldLength).HasColumnName("hold_length");

                entity.Property(e => e.Notes).HasColumnName("notes");

                entity.Property(e => e.PriceTarget).HasColumnName("price_target");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SellReason).HasColumnName("sell_reason");

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.PortfolioAssets)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("portfolio_asset_asset_id_fkey");
            });

            modelBuilder.Entity<Resource>(entity =>
            {
                entity.ToTable("resource");

                entity.Property(e => e.ResourceId).HasColumnName("resource_id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.ResourceGroupId).HasColumnName("resource_group_id");

                entity.Property(e => e.ResourceName)
                    .IsRequired()
                    .HasColumnName("resource_name");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasColumnName("url");

                entity.HasOne(d => d.ResourceGroup)
                    .WithMany(p => p.Resources)
                    .HasForeignKey(d => d.ResourceGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("resource_resource_group_id_fkey");
            });

            modelBuilder.Entity<ResourceGroup>(entity =>
            {
                entity.ToTable("resource_group");

                entity.Property(e => e.ResourceGroupId).HasColumnName("resource_group_id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasColumnName("group_name");
            });

            modelBuilder.Entity<SectionCategory>(entity =>
            {
                entity.ToTable("section_category");

                entity.Property(e => e.SectionCategoryId).HasColumnName("section_category_id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.SortOrder).HasColumnName("sort_order");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
