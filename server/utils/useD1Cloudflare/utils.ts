const _getPlatformProxy = async () => {
    const _pkg = "wrangler";
    const { getPlatformProxy } = await import(_pkg).catch(() => {
        throw new Error(
            "Package `wrangler` not found, please install it with: `npx nypm@latest add -D wrangler`"
        );
    });
    const runtimeConfig = useRuntimeConfig();
    const proxyOptions = {
        configPath: runtimeConfig.wrangler.configPath,
        persist: { path: runtimeConfig.wrangler.persistDir },
        environment: {}
    };
    if (runtimeConfig.wrangler.environment) {
        proxyOptions.environment = runtimeConfig.wrangler.environment;
    }
    const proxy = await getPlatformProxy(proxyOptions);
    return proxy;
}

const _proxy = _getPlatformProxy().catch((error) => {
    console.error("Failed to initialize wrangler bindings proxy", error);
}).then((proxy) => {
    return proxy;
});

const getCloudflareEnv = async () => {
    return (await _proxy).env
}

export { getCloudflareEnv }