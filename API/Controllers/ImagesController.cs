using Application.Images.Commands.DeleteImage;
using Application.Images.Commands.SetMainImage;
using Application.Images.Commands.UploadImage;
using Application.Images.Dtos;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin + "," + RolesEnum.Client)]
    [Route("api/sport-objects")]
    public class ImagesController : ApiController
    {
        [HttpPost("{id}/images")]
        public async Task<ActionResult<ImageVm>> Upload(int id, [FromForm]UploadImageCommand command)
        {
            command.SportObjectId = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{sportObjectId}/images/{imageId}")]
        public async Task<ActionResult<Unit>> Delete(int sportObjectId, string imageId)
        {
            return await Mediator.Send(new DeleteImageCommand { SportObjectId = sportObjectId, Id = imageId });
        }

        [HttpPost("{sportObjectId}/images/{imageId}/set-main")]
        public async Task<ActionResult<Unit>> SetMain(int sportObjectId, string imageId)
        {
            return await Mediator.Send(new SetMainImageCommand { SportObjectId = sportObjectId, Id = imageId });
        }
    }
}
