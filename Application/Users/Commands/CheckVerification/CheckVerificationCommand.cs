using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.CheckVerification
{
    public class CheckVerificationCommand : IRequest
    {
        public string Code { get; set; }
    }

    public class CheckVerificationCommandHandler : IRequestHandler<CheckVerificationCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IVerificationService _verificationService;
        private readonly ICurrentUserService _currentUserService;

        public CheckVerificationCommandHandler(IAppDbContext context, IVerificationService verificationService, ICurrentUserService currentUserService)
        {
            _context = context;
            _verificationService = verificationService;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(CheckVerificationCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(_currentUserService.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(AppUser), _currentUserService.UserId);
            }

            if (user.IsVerified)
            {
                throw new Exception("Vec ste verifikovali broj telefona");
            }

            var result = await _verificationService.CheckVerificationAsync(user.PhoneNumber, request.Code);

            if (!result.IsValid)
            {
                foreach (var error in result.Errors)
                {
                    throw new Exception(error);
                }
            }

            user.IsVerified = true;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
