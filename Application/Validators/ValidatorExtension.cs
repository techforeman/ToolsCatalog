using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtension
    {
        public static IRuleBuilder<t, string> Password<t>(this IRuleBuilder<t, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().MinimumLength(6).WithMessage("Password must contain at leas 6 characters")
                .Matches("[A-Z]").WithMessage("Password must contain at least 1 uppercase letter")
                .Matches("[a-a]").WithMessage("Password must contain at least 1 lowercase letter")
                .Matches("[0-9]").WithMessage("Password must contain at least 1 digit character")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least 1 alpfhanumeric character");


            return options;
        }
        
    }
}