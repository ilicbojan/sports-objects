using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class SportConfiguration : IEntityTypeConfiguration<Sport>
  {
    public void Configure(EntityTypeBuilder<Sport> builder)
    {
      builder.Property(s => s.Name)
          .HasMaxLength(15)
          .IsRequired();
    }
  }
}