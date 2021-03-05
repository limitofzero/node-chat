import { DtoPropertyError } from '@task-manager/api-errors';

export interface InvalidArgumentsPayload {
  errors: DtoPropertyError[];
}
