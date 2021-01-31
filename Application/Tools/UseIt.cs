using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Tools
{
    public class UseIt
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var tool = await _context.Tools.FindAsync(request.Id);

                if (tool == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Tool = "Could not find tool" });
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var usingIt = await _context.UserTools.SingleOrDefaultAsync(x => x.ToolId == tool.Id && x.AppUserId == user.Id);

                if (usingIt != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { UsingIt = "Already using this tool" });

                usingIt = new UserTool
                {
                    Tool = tool,
                    AppUser = user,
                    IsAuthor = false,
                    StartUseItOn = DateTime.Now

                };
                _context.UserTools.Add(usingIt);



                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem while saving changes");
            }
        }
    }
}