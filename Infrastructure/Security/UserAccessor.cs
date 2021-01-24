using System.Linq;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpCintextAccessor;
        public UserAccessor(IHttpContextAccessor httpCintextAccessor)
        {
            _httpCintextAccessor = httpCintextAccessor;
        }

        public string GetCurrentUsername()
        {
            var username = _httpCintextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => 
            x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }
    }
}