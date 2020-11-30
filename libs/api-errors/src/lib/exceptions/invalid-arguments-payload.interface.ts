import { DtoPropertyError } from "@messenger/api-errors";

export interface InvalidArgumentsPayload {
  errors: DtoPropertyError[];
}
