using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class Paciente
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Telefono { get; set; }
        public string? Email { get; set; }
    }

    public class ClinicaContext : DbContext
    {
        public ClinicaContext(DbContextOptions<ClinicaContext> options) : base(options) { }

        public DbSet<Paciente> Pacientes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Paciente>()
                .Property(p => p.Nombre)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Paciente>()
                .Property(p => p.Telefono)
                .HasMaxLength(20);

            modelBuilder.Entity<Paciente>()
                .Property(p => p.Email)
                .HasMaxLength(100);
        }
    }
}
