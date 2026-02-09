import { Resend } from "resend";
import { serverEnv } from "../env";

export const resend = new Resend(serverEnv.RESEND_API_KEY);
