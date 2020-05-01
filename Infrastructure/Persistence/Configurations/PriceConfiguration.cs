using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class PriceConfiguration : IEntityTypeConfiguration<Price>
  {
    public void Configure(EntityTypeBuilder<Price> builder)
    {
      builder.Property(p => p.PricePerHour)
              .HasMaxLength(5)
              .IsRequired();

      builder.Property(p => p.TimeFrom).IsRequired();

      builder.Property(p => p.TimeTo).IsRequired();

      builder.Property(p => p.SportObjectId).IsRequired();
    }
  }
}