using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Tools
{
    public class ToolDto
    {
              public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }

        
[JsonPropertyName("usedby")]
        public ICollection<UsedbyDto> UserTools { get; set; }
    }
}