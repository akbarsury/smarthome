type CustomAppConfig = {
    origin: string,
    appOrigin: string,
    resolvedOriginRouting: "app" | "guest" | undefined
};

export default defineAppConfig<CustomAppConfig>({
    origin: "localhost",
    appOrigin: "app.localhost",
    resolvedOriginRouting: undefined
})