using Application.Common.Interfaces;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Behaviours
{
  public class RequestLogger<TRequest> : IRequestPreProcessor<TRequest>
  {
    private readonly ILogger _logger;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public RequestLogger(ILogger<TRequest> logger, ICurrentUserService currentUserService, IIdentityService identityService)
    {
      _logger = logger;
      _currentUserService = currentUserService;
      _identityService = identityService;
    }

    public async Task Process(TRequest request, CancellationToken cancellationToken)
    {
      var requestName = typeof(TRequest).Name;
      var username = _currentUserService.Username ?? string.Empty;
      string userId = string.Empty;

      // !!! CHECK, error when using authorization, GetCurrentUser
      if (!string.IsNullOrEmpty(username))
      {
        userId = await _identityService.GetUserIdAsync(username);
      }

      _logger.LogInformation("SportObjects Request: {Name} {@UserId} {@UserName} {@Request}",
          requestName, userId, username, request);
    }
  }
}
