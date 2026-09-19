export class TodoExistError extends Error {}

export const ID_IS_NOT_VALID_MSG = 'id is not valid';
export const TITLE_IS_NOT_VALID_MSG = 'title is not valid';
export const TITLE_IS_TOO_SHORT_MSG = 'title is too short';

export type TodoParingErrorMsgType =
  typeof ID_IS_NOT_VALID_MSG | typeof TITLE_IS_NOT_VALID_MSG | typeof TITLE_IS_TOO_SHORT_MSG;
export class TodoDtoParsingError extends Error {
  constructor(msg: TodoParingErrorMsgType) {
    super(msg);
  }
}

export type TODO_ERROR = TodoExistError;
