import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const action = createSafeActionClient({
	handleReturnedServerError(e) {
		if (e instanceof ZodError) {
			return fromZodError(e).toString();
		}
		if (e instanceof Error) {
			return e.message;
		}

		return DEFAULT_SERVER_ERROR;
	},
});
