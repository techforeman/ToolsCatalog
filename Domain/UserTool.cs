using System;

namespace Domain
{
    public class UserTool
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid ToolId { get; set; }

        public virtual Tool Tool { get; set; }

        public DateTime StartUseItOn { get; set; }
        public bool IsAuthor {get; set;}
    }
}