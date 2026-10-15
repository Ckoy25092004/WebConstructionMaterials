# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY ConstructionMaterials.Api/*.csproj ./ConstructionMaterials.Api/
RUN dotnet restore ./ConstructionMaterials.Api/ConstructionMaterials.Api.csproj

COPY ConstructionMaterials.Api/ ./ConstructionMaterials.Api/
WORKDIR /app/ConstructionMaterials.Api
RUN dotnet publish -c Release -o /out

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /out ./

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "ConstructionMaterials.Api.dll"]
