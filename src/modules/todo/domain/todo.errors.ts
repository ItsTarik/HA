export class TodoExistError extends Error {
  constructor() {
    super('Todo title already exist');
  }
}

export const TODO_PARSING_ERROR = {
  ID_IS_NOT_VALID_MSG: 'id is not valid',
  TITLE_IS_NOT_VALID_MSG: 'title is not valid',
  TITLE_IS_TOO_SHORT_MSG: 'title is too short',
} as const;

export type TodoParingErrorMsgType = (typeof TODO_PARSING_ERROR)[keyof typeof TODO_PARSING_ERROR];
export class TodoDtoParsingError extends Error {
  constructor(msg: TodoParingErrorMsgType) {
    super(msg);
  }
}

export type TODO_ERROR = TodoExistError;
