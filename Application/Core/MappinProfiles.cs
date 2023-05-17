
//the Core directory of the application will be responsible for new features inside of the application (for something that is not a activity)

using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappinProfiles : Profile
    {
        public MappinProfiles()
        {
            CreateMap<Activity,Activity>();
        }
    }
}