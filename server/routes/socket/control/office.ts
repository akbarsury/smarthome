import { SmarthomeWebsocket } from "~/server/utils/useSmarthomeWS/utils/wsHandler"

const officeHandler = new SmarthomeWebsocket('office')

export default defineWebSocketHandler(wsHandler(officeHandler))