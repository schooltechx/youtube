# การใช้งาน Github Action เบื้องต้น


``` sh
dotnet --version
dotnet --list-sdks
dotnet new webapp -au Individual --no-https -n github-action  
cd .\github-action
code .
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
dotnet tool update --global dotnet-ef
``` 
แก้โค้ด Program.cs ให้ใช้ SQLite แทน MSSQL
``` csharp
builder.Services.AddSqlite<ApplicationDbContext>("Data Source=app.db");
//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseSqlServer(connectionString));
```

``` sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Dockerfile
```
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["github-action-test/github-action-test.csproj", "github-action-test/"]
RUN dotnet restore "github-action-test/github-action-test.csproj"
COPY . .
WORKDIR "/src/github-action-test"
RUN dotnet build "github-action-test.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "github-action-test.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "github-action-test.dll"]
```