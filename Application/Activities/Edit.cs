using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> {
            public Activity Activity { get; set; }
        }

         public class CommandValidatior : AbstractValidator<Command>{
            public CommandValidatior()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidatior());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _contex;
             private readonly IMapper _mapper;
            public Handler(DataContext contex,IMapper mapper)
            {
                 _mapper = mapper;
                 _contex = contex;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _contex.Activities.FindAsync(request.Activity.Id);

                if(activity == null) return null;

                _mapper.Map(request.Activity, activity);

                var result = await _contex.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update the activity");

                return Result<Unit>.Success(Unit.Value); 
            }
        }
    }
}