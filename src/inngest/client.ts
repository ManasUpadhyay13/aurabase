import { Inngest } from "inngest";
import { APP_NAME } from "../../utils/constant";

export const inngest = new Inngest({ id: APP_NAME.toLowerCase() });
