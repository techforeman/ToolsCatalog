using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Tools
{
    public class Details
    {
        public class Query : IRequest<Tool>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Tool>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Tool> Handle(Query request, CancellationToken cancellationToken)
            {
                var tool = await _context.Tools.FindAsync(request.Id);
                return tool;
            }
        }
    }
}