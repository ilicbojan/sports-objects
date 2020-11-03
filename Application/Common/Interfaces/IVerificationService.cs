using Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IVerificationService
    {
        Task<VerificationResult> StartVerificationAsync(string phoneNumber);

        Task<VerificationResult> CheckVerificationAsync(string phoneNumber, string code);
    }
}
