using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.SmsVerification
{
    public class TwilioSettings
    {
        public string AccountSid { get; set; }
        public string AuthToken { get; set; }
        public string VerificationSid { get; set; }
    }
}
