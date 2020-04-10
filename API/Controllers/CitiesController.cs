using System.Threading.Tasks;
using Application.Cities.Commands.DeleteCity;
using Application.Cities.Commands.CreateCity;
using Application.Cities.Commands.UpdateCity;
using Application.Cities.Queries.GetCities;
using Application.Cities.Queries.GetCityDetails;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class CitiesController : ApiController
  {
    [HttpGet]
    public async Task<ActionResult<CitiesVm>> GetAll()
    {
      return await Mediator.Send(new GetCitiesQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CityVm>> Get(int id)
    {
      return await Mediator.Send(new GetCityDetailsQuery { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(CreateCityCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Update(int id, UpdateCityCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(int id)
    {
      return await Mediator.Send(new DeleteCityCommand { Id = id });
    }
  }
}