using System.Threading.Tasks;
using Application.Countries.Commands.CreateCountry;
using Application.Countries.Commands.DeleteCountry;
using Application.Countries.Commands.UpdateCountry;
using Application.Countries.Queries.GetCountriesList;
using Application.Countries.Queries.GetCountryDetails;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class CountriesController : ApiController
  {
    [HttpGet]
    public async Task<ActionResult<CountriesListVm>> GetAll()
    {
      return await Mediator.Send(new GetCountriesListQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CountryVm>> Get(int id)
    {
      return await Mediator.Send(new GetCountryDetailsQuery { Id = id });
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateCountryCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Update(int id, UpdateCountryCommand command)
    {
      command.Id = id;

      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(int id)
    {
      return await Mediator.Send(new DeleteCountryCommand { Id = id });
    }
  }
}