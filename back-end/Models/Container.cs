using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models;

[Table("Containers")]
public class Container
{
    public Container()
    {
        Movements = new Collection<Movement>();
    }

    [Key]
    public int ContainerId { get; set; }

    [Required]
    [StringLength(50)]
    public string? Cliente { get; set; }

    [Required]
    [StringLength(11)]
    public string? Numero { get; set; }

    [Required]
    public int Tipo { get; set; }

    [Required]
    [StringLength(50)]
    public string? Situacao { get; set; }

    [Required]
    [StringLength(50)]
    public string? Categoria { get; set; }
    public ICollection<Movement>? Movements { get; set; }
}