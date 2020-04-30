using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkingHours.Commands.UpdateWorkingHours
{
  public class WorkingHourDto
  {
    public int Id { get; set; }
    public int Day { get; set; }
    public string OpenTime { get; set; }
    public string CloseTime { get; set; }
  }

  public class UpdateWorkingHoursCommand : IRequest
  {
    public int SportObjectId { get; set; }
    public List<WorkingHourDto> WorkingHours { get; set; }
  }

  public class UpdateWorkingHoursCommandHandler : IRequestHandler<UpdateWorkingHoursCommand>
  {
    private readonly IAppDbContext _context;
    public UpdateWorkingHoursCommandHandler(IAppDbContext context)
    {
      _context = context;
    }

    public async Task<Unit> Handle(UpdateWorkingHoursCommand request, CancellationToken cancellationToken)
    {
      var workingHours = await _context.WorkingHours
            .Where(wh => wh.SportObjectId == request.SportObjectId)
            .ToListAsync(cancellationToken);

      foreach (var wh in workingHours)
      {
        foreach (var whNew in request.WorkingHours)
        {
          if (wh.Id == whNew.Id)
          {
            wh.OpenTime = TimeSpan.Parse(whNew.OpenTime);
            wh.CloseTime = TimeSpan.Parse(whNew.CloseTime);
            break;
          }
        }
      }

      await _context.SaveChangesAsync(cancellationToken);

      return Unit.Value;
    }
  }
}