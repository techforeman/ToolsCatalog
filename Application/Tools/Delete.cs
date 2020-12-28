using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Tools
{
    public class Delete
    {
        public class Command : IRequest
                {
                    public Guid Id { get; set; }
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
                        if(tool == null)
                            throw new Exception("Could not find that tool");
                        _context.Remove(tool);    
                        var success = await _context.SaveChangesAsync() > 0;
                    
                        if(success) return Unit.Value;
                        throw new Exception("Problem while saving changes");
                    }

            
        }
    }
}