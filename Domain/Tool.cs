using System;
using System.Collections.Generic;

namespace Domain
{
    public class Tool
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public virtual ICollection<UserTool> UserTools { get; set; }
    }
}