using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistance;

namespace Infrastructure.Security
{
    public class IsAuthorRequirement : IAuthorizationRequirement
    {

    }

    public class IsAuthorRequirementHandler : AuthorizationHandler<IsAuthorRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsAuthorRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAuthorRequirement requirement)
        {

            
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            
            var toolId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

            var tool = _context.Tools.FindAsync(toolId).Result;

            var author = tool.UserTools.FirstOrDefault(x => x.IsAuthor);

            if (author?.AppUser?.UserName == currentUserName)
                context.Succeed(requirement);

            return Task.CompletedTask;

        }
    }
}