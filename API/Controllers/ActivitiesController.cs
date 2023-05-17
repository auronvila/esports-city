using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using MediatR;
using Application.Activities;

namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {


        [HttpGet] // Route: GET api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // Route: GET api/activities/{id}
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost] // Route: POST api/activities
        public async Task<IActionResult> CreateActivity(Activity activity){
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")] // Route: PUT api/activities/{id}
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){

            activity.Id = id;
            
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")] // Route: DELETE api/activities/{id}
        public async Task<IActionResult> DeleteActivity(Guid id){

                return Ok(await Mediator.Send(new Delete.Command { Id = id }));
                
        }
    }
}
