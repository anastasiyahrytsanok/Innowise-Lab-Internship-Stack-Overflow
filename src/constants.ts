export const PAGE_NAVIGATION = {
  REGISTRATION: "/registration",
  LOGIN: "/login",
  HOME: "/home",
  MY_ACCOUNT: "/myaccount",
  POST_SNIPPETS: "/postsnippet",
  MY_SNIPPETS: "/mysnippets",
  QUESTIONS: "/questions",
  USERS: "/users",
  ERROR: "/error",
};

export const VALIDATION_ERRORS = {
  WRONG_LOGIN_OR_PASSWORD: "Invalid username or password",
  USER_EXIST: "User already exists",
  ROOT: "An error occurred. Please try again.",
  REQUIRED_FIELD: "This field is required",
  MIN_SYMBOLS_COUNT: "Minimum number of characters: ",
  UPPERCASE_LETTER: "At least one uppercase letter is required",
  LOWERCASE_LETTER: "At least one lowercase letter is required",
  NUMBER: "At least one number is required",
  SYMBOL: "At least one special character is required",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  REQUIRED_CODE: "Code is required",
  WRONG_OLD_PASSWORD: "Old password is incorrect!",
};

export const ENTER_FORM_TEXT = {
  TITLE: {
    REGISTRATION: "Create your account",
  },
  LINK: {
    TO_LOGIN: "Login",
    TO_REGISTER: "Sign up",
  },
  LABEL: {
    USERNAME: "Username",
    PASSWORD: "Password",
    CONFIRM: "Confirm password",
  },
  BUTTON: {
    REGISTER: "Sign up",
    LOGIN: "Log in",
  },
  CHECKBOX_LABEL: "Show password",
};

export const HEADER_TEXT = {
  NAME: "GODELANG",
  BUTTON: {
    SIGN_OUT: " Sign out",
    LOG_IN: "Log in",
  },
  LANGUAGE: "EN",
};

export const REGISTER_PAGE_TEXT = {
  SUCCESSFUL_REGISTRATION: "The user has been successfully registered.",
};

export const HOME_PAGE_TEXT = {
  TITLE: "Welcome to cogelang!",
};

export const MY_ACCOUNT_PAGE_TEXT = {
  TITLE: "Welcome",
  USER_DESCRIPTION: {
    ROLE: "Role",
    ID: "Id",
  },
  EDIT_FORM: {
    TITLE: "Edit your profile:",
    CHANGE_NAME: "Change your user name:",
    CHANGE_PASSWORD: "Change your password:",
    LABEL: {
      NEW_USERNAME: "New username",
      OLD_PASSWORD: "Old password",
      NEW_PASSWORD: "New password",
      CONFIRM_PASSWORD: "Confirm password",
    },
    BUTTON: {
      SAVE: "Save",
      CHANGE_PASSWORD: "Change password",
    },
    CHECKBOX_LABEL: "Show password",
  },
  SUCCESSFUL_ACCOUNT_DELETION: "The account has been successfully deleted.",
  SUCCESSFUL_NAME_CHANGE: "The name has been successfully changed.",
  SUCCESSFUL_NAME_PASSWORD: "The password has been successfully changed.",
};

export const SNIPPET_FORM_TEXT = {
  TITLE: {
    CREATE: "Create new snippet!",
    EDIT: "Edit the snippet!",
  },
  SELECT_LANGUAGE_DESCRIPTION: " Language of your snippet:",
  SELECT_LANGUAGE_LABEL: "Select",
  CODE_LABEL: "Code of your snippet:",
  BUTTON: {
    SAVE: "Save",
    EDIT: "Edit",
  },
};

export const MY_SNIPPETS_PAGE_TEXT = {
  NO_SNIPPETS: "No posted snippets yet!",
  SUCCESSFUL_SNIPPET_DELETION: "The snippet has been successfully deleted.",
};

export const QUESTIONS_PAGE_TEXT = {
  NO_QUESTIONS: "No questions yet!",
  ASK_QUESTION_BUTTON: "Ask a question",
  SUCCESSFUL_QUESTION_DELETION: "The question has been successfully deleted.",
  NAME_LABEL: "asked by user:",
};

export const USERS_PAGE_TEXT = {
  NO_USERS: "No users yet!",
};

export const CONFIRMATION_DIALOG_TEXT = {
  CONFIRM_BUTTON: "Yes",
  CANCEL_BUTTON: "No",
  LOGOUT: {
    TITLE: "Confirm exit",
    QUESTION: "Are you sure you want to exit?",
  },
  DELETE: {
    TITLE: "Confirming account deletion",
    QUESTION: "Are you sure you want to delete your account?",
  },
  CHANGE_NAME: {
    TITLE: "Confirmation of name change",
    QUESTION: "Are you sure you want to change your name?",
  },
  CHANGE_PASSWORD: {
    TITLE: "Confirmation of password change",
    QUESTION: "Are you sure you want to change your password?",
  },
  CREATE_SNIPPET: {
    TITLE: "Create snippet",
    QUESTION: "Are you sure you want to publish this snippet?",
  },
  DELETE_SNIPPET: {
    TITLE: "Delete snippet",
    QUESTION: "Are you sure you want to delete this snippet?",
  },
  EDIT_SNIPPET: {
    TITLE: "Edit snippet",
    QUESTION: "Are you sure you want to edit this snippet?",
  },
  CREATE_QUESTION: {
    TITLE: "Create question",
    QUESTION: "Are you sure you want to create this question?",
  },
  EDIT_QUESTION: {
    TITLE: "Edit question",
    QUESTION: "Are you sure you want to edit this question?",
  },
  DELETE_QUESTION: {
    TITLE: "Delete question",
    QUESTION: "Are you sure you want to delete this question?",
  },
  DELETE_COMMENT: {
    TITLE: "Delete comment",
    QUESTION: "Are you sure you want to delete this comment?",
  },
};

export const QUESTION_FORM_TEXT = {
  EXIT_BUTTON: { CREATE: "Ask a question", EDIT: "Edit a question" },
  LABEL: {
    TITLE: "Question title",
    DESCRIPTION: "Question description",
    CODE: "Attached Code:",
  },
  BUTTON: { SAVE: "Save", EDIT: "Edit" },
};

export const QUESTION_PAGE_TEXT = {
  ANSWER_TITLE: "Answers",
  SUCCESSFUL_COMMENT_DELETION: "The comment has been successfully deleted.",
};

export const COMMENTS_BOX_TEXT = {
  TITLE: "Comments",
  BUTTON: {
    ADD_COMMENT: "Add comment",
  },
};

export const ERROR_PAGE_TEXT = {
  TITLE: "ERROR 404",
  DESCRIPTION: "Something went wrong... Please try again.",
  ALT: {
    SAD_FACE: "Sad face",
  },
};

export const SIDEBAR_WIDTH = 250;

export const HEADER_HEIGHT = 64;

export const PAGE_SIZE = 10;
