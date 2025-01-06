import type { UseWebSocketReturn } from '@vueuse/core';
import { defineStore } from 'pinia';

type ConnectionStatus = 'disconnected' | 'connected'

class WebSocket {

    constructor() {
        // this._data
    }

    _data: UseWebSocketReturn<any> | undefined;

    connect = (accessToken: string) => {
        this._data = useWebSocket(
            `${useNitroOrigin()
            }/_ws/${accessToken}`,
            {
                onConnected: (ws) => {
                    ws.send(JSON.stringify({ requestAction: "client-init" }));
                },
                onDisconnected: (ws) => {
                    console.log(`WS disconnected: ${ws.url}`);
                },
                onMessage(ws, event) {
                    if (typeof event.data === "string") {
                    }
                },
                autoReconnect: {
                    retries: 3,
                    delay: 1000,
                    onFailed() {
                        console.warn("Failed to connect WebSocket after 3 retries");
                    },
                },
            }
        )
    }
}

export const useWsStore = defineStore('ws', () => {
    const user = useCookie('us_auth').value = process.env.NODE_ENV === 'development' ? 'kirimkeakbar' : undefined
    // const status: ConnectionStatus = 'disconnected'
    const webSocket = new WebSocket()

    const init = async () => {
        if (user) {
            const initStatus = setInterval(async () => {
                const { data, status } = await useFetch('/init')
                if (status.value == 'success') {
                    console.log(status.value);
                    const token = useCookie('us_token')
                    token.value = data.value?.token || ''
                    console.log({ token: token.value });
                    webSocket.connect(token.value)
                    clearInterval(initStatus)
                }
            }, 1000)
        }
    }

    return {
        user,
        webSocket,
        init
    }
});
