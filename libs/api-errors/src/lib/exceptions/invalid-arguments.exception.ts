import { InvalidArgumentsPayload } from "./invalid-arguments-payload.interface";
import { ApiException } from "./api.exception";
import { Exceptions } from "./exceptions.enum";

export class InvalidArgumentsException extends ApiException<InvalidArgumentsPayload> {
  constructor(payload: InvalidArgumentsPayload) {
    super(Exceptions.InvalidArgs, payload);
  }
}
