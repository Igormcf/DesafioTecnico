using back_end.Context;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class ContainersController : ControllerBase
{
  private readonly AppDbContext _context;

    public ContainersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("movimentacoes")]
    public ActionResult<IEnumerable<Container>> GetContainersMovements()
    {
      try
      {
        return _context.Containers.Include(p => p.Movements).AsNoTracking().ToList();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpGet]
    public ActionResult<IEnumerable<Container>> Get()
    {
      try
      {
        var container = _context.Containers.AsNoTracking().ToList();

        if (container is null)
          return NotFound("Containers não encontrados!");

        return Ok(container);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpGet("{id:int}", Name = "ObterContainer")]
    public ActionResult<Container> Get(int id)
    {
      try
      {
        var container = _context.Containers.AsNoTracking().FirstOrDefault(P => P.ContainerId == id);

        if (container == null)
          return NotFound($"Container com id={id} não encontrado!");

        return Ok(container);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpPost]
    public ActionResult Post(Container container)
    {
      try
      {
        if (container is null)
          return BadRequest("Dados inválidos!");

        _context.Containers.Add(container);
        _context.SaveChanges();

        return new CreatedAtRouteResult("ObterContainer", new { id = container.ContainerId }, container);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpPut("{id:int}")]
    public ActionResult Put(int id, Container container)
    {
      try
      {
        if (id != container.ContainerId)
          return BadRequest("Dados inválidos!");

        _context.Entry(container).State = EntityState.Modified;
        _context.SaveChanges();

        return Ok(container);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpDelete("{id:int}")]
    public ActionResult<Container> Delete(int id)
    {
      try
      {
        var container = _context.Containers.FirstOrDefault(p => p.ContainerId == id);

        if (container == null)
          return NotFound($"Container com id={id} não encontrado...");

        _context.Containers.Remove(container);
        _context.SaveChanges();

        return Ok(container);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }
}