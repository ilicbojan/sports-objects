using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Exceptions;
using Twilio.Rest.Verify.V2.Service;

namespace Infrastructure.SmsVerification
{
    public class VerificationService : IVerificationService
    {
        private readonly IOptions<TwilioSettings> _config;

        public VerificationService(IOptions<TwilioSettings> config)
        {
            _config = config;
            TwilioClient.Init(_config.Value.AccountSid, _config.Value.AuthToken);
        }

        public async Task<VerificationResult> StartVerificationAsync(string phoneNumber)
        {
            try
            {
                var verificationResource = await VerificationResource.CreateAsync(
                    to: phoneNumber,
                    channel: "sms",
                    pathServiceSid: _config.Value.VerificationSid
                );

                return new VerificationResult(verificationResource.Sid);
            }
            catch (TwilioException e)
            {
                return new VerificationResult(new List<string> { e.Message });
            }
        }

        public async Task<VerificationResult> CheckVerificationAsync(string phoneNumber, string code)
        {
            try
            {
                var verificationCheckResource = await VerificationCheckResource.CreateAsync(
                    to: phoneNumber,
                    code: code,
                    pathServiceSid: _config.Value.VerificationSid
                );

                return verificationCheckResource.Status.Equals("approved") ?
                    new VerificationResult(verificationCheckResource.Sid) :
                    new VerificationResult(new List<string> { "Wrong code. Try again." });
            }
            catch (TwilioException e)
            {
                return new VerificationResult(new List<string> { e.Message });
            }
        }
    }
}
