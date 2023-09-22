using back_end.Context;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class MovementsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MovementsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Movement>> Get()
    {
      try
      {
        var movements = _context.Movements.AsNoTracking().ToList();

        if (movements == null)
          return NotFound("Movimentações não encontradas!");

        return Ok(movements);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpGet("{id:int}", Name = "ObterMov")]
    public ActionResult<Movement> Get(int id)
    {
      try
      {
        var movement = _context.Movements.AsNoTracking().FirstOrDefault(p => p.MovementId == id);

        if ( movement is null)
          return NotFound($"Movimentação com id={id} não encontrada!");

        return Ok(movement);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpPost]
    public ActionResult Post(Movement movement)
    {
      try
      {
        if (movement is null)
          return BadRequest("Dados inválidos!");

        _context.Movements.Add(movement);
        _context.SaveChanges();

        return new CreatedAtRouteResult("ObterMov", new { id = movement.MovementId }, movement);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpPut("{id:int}")]
    public ActionResult Put(int id, Movement movement)
    {
      try
      {
        if (id != movement.MovementId)
          return BadRequest("Dados inválidos!");

        _context.Entry(movement).State = EntityState.Modified;
        _context.SaveChanges();

        return Ok(movement);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }

    [HttpDelete("{id:int}")]
    public ActionResult<Movement> Delete(int id)
    {
      try
      {
        var movement = _context.Movements.FirstOrDefault(p => p.MovementId == id);

        if (movement is null)
          return NotFound("Movimentação não localizada...");

        _context.Movements.Remove(movement);
        _context.SaveChanges();

        return Ok(movement);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um problema ao tratar a sua solicitação.");
      }
    }
}