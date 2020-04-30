using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.WorkingHours.Commands.CreateWorkingHours
{
  public class WorkingHourDto
  {
    public int Day { get; set; }
    public string OpenTime { get; set; }
    public string CloseTime { get; set; }
  }

  public class CreateWorkingHoursCommand : IRequest
  {
    // public int Day { get; set; }
    // public string OpenTime { get; set; }
    // public string CloseTime { get; set; }
    public int SportObjectId { get; set; }
    public List<WorkingHourDto> WorkingHours { get; set; }
  }

  public class CreateWorkingHoursCommandHandler : IRequestHandler<CreateWorkingHoursCommand>
  {
    private readonly IAppDbContext _context;
    public CreateWorkingHoursCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(CreateWorkingHoursCommand request, CancellationToken cancellationToken)
    {
      // var workingHour = new WorkingHour
      // {
      //   Day = request.Day,
      //   OpenTime = TimeSpan.Parse(request.OpenTime),
      //   CloseTime = TimeSpan.Parse(request.CloseTime),
      //   SportObjectId = request.SportObjectId
      // };

      var workingHours = new List<WorkingHour>();

      foreach (var wh in request.WorkingHours)
      {
        var workingHour = new WorkingHour
        {
          Day = wh.Day,
          OpenTime = TimeSpan.Parse(wh.OpenTime),
          CloseTime = TimeSpan.Parse(wh.CloseTime),
          SportObjectId = request.SportObjectId
        };

        workingHours.Add(workingHour);
      }

      _context.WorkingHours.AddRange(workingHours);

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}