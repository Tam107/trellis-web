/** The `status` Astryx's form controls take, for a validation message under a field. */
export type FieldStatus = { type: "error"; message: string };

const ERROR_TYPE = "error";

/** `undefined` while there is nothing to say, so a field only turns red once it has a message. */
export function fieldError(message: string | undefined): FieldStatus | undefined {
  return message ? { type: ERROR_TYPE, message } : undefined;
}
