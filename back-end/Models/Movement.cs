using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_end.Models;

[Table("Movements")]
public class Movement
{
    [Key]
    public int MovementId { get; set; }

    [Required]
    [StringLength(50)]
    public string? Tipo { get; set; }

    [Required]
    [StringLength(20)]
    public string? DataInicio { get; set; }

    [Required]
    [StringLength(20)]
    public string? DataFim { get; set; }

    [Required]
    public int ContainerId { get; set; }

    [JsonIgnore]
    public Container? Container { get; set; }
}