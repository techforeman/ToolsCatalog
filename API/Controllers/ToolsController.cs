
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Tools;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ToolsController : BaseController
    {


        [HttpGet]
        public async Task<ActionResult<List<ToolDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }


        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ToolDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsToolAuthor")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsToolAuthor")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }


        [HttpPost("{id}/useit")]
        public async Task<ActionResult<Unit>> UseIt(Guid id)
        {
            return await Mediator.Send(new UseIt.Command{Id = id});
        }


        [HttpDelete("{id}/useit")]
        public async Task<ActionResult<Unit>> UnUseIt(Guid id)
        {
            return await Mediator.Send(new UnUseIt.Command{Id = id});
        }

    }
}