using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Tools
{
    public class List
    {
        public class Query : IRequest<List<ToolDto>> { }
        public class Handler : IRequestHandler<Query, List<ToolDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;

                _context = context;

            }

            public async Task<List<ToolDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                var tools = await _context.Tools
                .ToListAsync();

                var toolsToReturn = _mapper.Map<List<Tool>, List<ToolDto>>(tools);
                return toolsToReturn;
            }
        }

    }
}