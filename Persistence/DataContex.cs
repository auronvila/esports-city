using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContex : DbContext
    {
        public DataContex(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
    }
}