using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Robert",
                        UserName = "robert",
                        Email = "majsterjunior@gmail.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Kasia",
                        UserName = "Kasia",
                        Email = "majsterjunior@gmail.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }

            if(!context.Tools.Any())
            {
                var tools = new List<Tool>
                {
                    new Tool
                    {
                        Name = "Tool1",
                        Description = "Desc1",
                        Category = "HR",
                        CreatedBy = "Author1",
                        CreatedOn = System.DateTime.Parse("2020-01-01")

                    },
                    new Tool
                    {
                        Name = "Tool2",
                        Description = "Desc2",
                        Category = "HR",
                        CreatedBy = "Author2",
                        CreatedOn = System.DateTime.Parse("2020-01-02")

                    },
                     new Tool
                    {
                        Name = "Tool3",
                        Description = "Desc3",
                        Category = "General",
                        CreatedBy = "Author1",
                        CreatedOn = System.DateTime.Parse("2020-01-03")

                    },
                     new Tool
                    {
                        Name = "Tool4",
                        Description = "Desc4",
                        Category = "Finance",
                        CreatedBy = "Author2",
                        CreatedOn = System.DateTime.Parse("2020-01-04")

                    },
                     new Tool
                    {
                        Name = "Tool5",
                        Description = "Desc5",
                        Category = "HR",
                        CreatedBy = "Author2",
                        CreatedOn = System.DateTime.Parse("2020-01-05")

                    },
                     new Tool
                    {
                        Name = "Tool6",
                        Description = "Desc6",
                        Category = "General",
                        CreatedBy = "Author1",
                        CreatedOn = System.DateTime.Parse("2020-01-06")

                    },
                     new Tool
                    {
                        Name = "Tool7",
                        Description = "Desc7",
                        Category = "Finance",
                        CreatedBy = "Author2",
                        CreatedOn = System.DateTime.Parse("2020-01-07")

                    },
                     new Tool
                    {
                        Name = "Tool8",
                        Description = "Desc8",
                        Category = "HR",
                        CreatedBy = "Author1",
                        CreatedOn = System.DateTime.Parse("2020-01-08")

                    },
                     new Tool
                    {
                        Name = "Tool9",
                        Description = "Desc9",
                        Category = "General",
                        CreatedBy = "Author2",
                        CreatedOn = System.DateTime.Parse("2020-01-09")

                    },
                     new Tool
                    {
                        Name = "Tool10",
                        Description = "Desc10",
                        Category = "Finance",
                        CreatedBy = "Author2",
                        CreatedOn = System.DateTime.Parse("2020-01-10")

                    }
                };
                context.Tools.AddRange(tools);
                context.SaveChanges();
            }
        }
    }
}