using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.Tools
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? CreatedOn { get; set; }
            public string CreatedBy { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.CreatedBy).NotEmpty();
                RuleFor(x => x.CreatedOn).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var tool = await _context.Tools.FindAsync(request.Id);
                  if (tool == null)
                    throw new RestException(HttpStatusCode.NotFound, new {tool = "Not found"});
                tool.Name = request.Name ?? tool.Name;
                tool.Description = request.Description ?? tool.Description;
                tool.Category = request.Category ?? tool.Category;
                tool.CreatedOn = request.CreatedOn ?? tool.CreatedOn;
                tool.CreatedBy = request.CreatedBy ?? tool.CreatedBy;
                
                


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem while saving changes");
            }
        }
    }
}