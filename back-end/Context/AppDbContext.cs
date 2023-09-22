using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}

    public DbSet<Container> Containers { get; set; }
    public DbSet<Movement> Movements { get; set; }
}