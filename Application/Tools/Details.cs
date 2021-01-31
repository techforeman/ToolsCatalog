using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Tools
{
    public class Details
    {
        public class Query : IRequest<ToolDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ToolDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ToolDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var tool = await _context.Tools
                    .FindAsync(request.Id);
                if (tool == null)
                    throw new RestException(HttpStatusCode.NotFound, new { tool = "Not found" });

                var toolToReturn = _mapper.Map<Tool, ToolDto>(tool);


                return toolToReturn;
            }
        }
    }
}