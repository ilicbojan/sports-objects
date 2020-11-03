using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.StartVerification
{
    public class StartVerificationCommand : IRequest
    {
    }

    public class StartVerificationCommandHandler : IRequestHandler<StartVerificationCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IVerificationService _verificationService;
        private readonly ICurrentUserService _currentUserService;

        public StartVerificationCommandHandler(IAppDbContext context, IVerificationService verificationService, ICurrentUserService currentUserService)
        {
            _context = context;
            _verificationService = verificationService;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(StartVerificationCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(_currentUserService.UserId);

            if (user.IsVerified)
            {
                throw new Exception("Vec ste verifikovali nalog");
            }

            var result = await _verificationService.StartVerificationAsync(user.PhoneNumber);

            if (!result.IsValid)
            {
                throw new Exception("Greska prilikom slanja verifikacije");
            }

            return Unit.Value;
        }
    }
}
