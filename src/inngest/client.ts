import { Inngest } from "inngest";
import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { APP_NAME } from "../../utils/constant";

export const inngest = new Inngest({
  id: APP_NAME.toLowerCase(),
  middleware: [realtimeMiddleware()],
});
