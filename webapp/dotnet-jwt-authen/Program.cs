using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "minimal API+ JWT", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
          {
              new OpenApiSecurityScheme
              {
                  Reference = new OpenApiReference
                  {
                      Type=ReferenceType.SecurityScheme,
                      Id="Bearer"
                  }
              },
              new string[]{}
          }
    });
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidateAudience = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateLifetime = false, //Production have to be true,
        ValidateIssuerSigningKey = true
    };
});
builder.Services.AddAuthorization();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello");
app.MapGet("/auth", [Authorize] (HttpContext context) =>
{
    var id = context.User.FindFirst("id")?.Value; 
    var n = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var gn = context.User.FindFirst(ClaimTypes.GivenName)?.Value;
    var sn = context.User.FindFirst(ClaimTypes.Surname)?.Value;
    return Results.Ok($"Authenticated: {id}:{n}:{gn}:{sn}") ;

});
app.MapGet("/admin1", [Authorize(Roles = "admin")] () => "Administrator");
app.MapGet("/dev1", [Authorize(Roles = "dev")] () => "Developer");
app.MapGet("/dev2", [Authorize(Roles = "admin,dev")] () => "Administrator or Developer");
app.MapPost("/login", [AllowAnonymous] (LoginRequest user) =>
{
    //Get user info, check password, create claims from info
    //Replace below hardcode with your user from database
    if (user.username != "admin" || user.password != "123")
        return Results.Unauthorized();
    var claims = new List<Claim>();
    claims.Add(new Claim("id", "1"));
    claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.username));
    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
    claims.Add(new Claim(ClaimTypes.GivenName, "Super"));
    claims.Add(new Claim(ClaimTypes.Surname, "User"));
    string[] roles = new string[] { "admin","dev" };
    foreach (var role in roles)
        claims.Add(new Claim("roles", role));

    var secureKey = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
    var issuer = builder.Configuration["Jwt:Issuer"];
    var audience = builder.Configuration["Jwt:Audience"];
    var securityKey = new SymmetricSecurityKey(secureKey);
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);
    var jwtTokenHandler = new JwtSecurityTokenHandler();
    //https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddMinutes(15),
        Audience = audience,
        Issuer = issuer,
        SigningCredentials = credentials
    };
    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
    var jwtToken = jwtTokenHandler.WriteToken(token);
    return Results.Ok(new LoginRespose("1", user.username, jwtToken));
});


app.Run();

record LoginRequest(string username, string password);
record LoginRespose(string userId, string username, string token);
