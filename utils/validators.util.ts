export const isPresence = (value: string, errorMessage: string) => {
  if (!value?.trim()) {
    return errorMessage;
  }
  return "";
};

export const isValidPassword = (value: string, errorMessage: string) => {
  if (!value || value.length < 8) {
    return errorMessage;
  }
  return "";
};

export const isValidLength = (
  value: string,
  errorMessage: string,
  length: number
) => {
  if (!value || value.length < length) {
    return errorMessage;
  }
  return "";
};

export const isValidHttpUrl = (url: string, errorMessage = "Invalid URL") => {
  const reg = /^https?:\/\/(www\.)?/;
  if (url && !reg.test(url)) {
    return errorMessage;
  }

  return "";
};

export const checkNumber = (number: string) => {
  return /^-?\d*$/.test(number);
};

export const isValidEmail = (value: string, errorMessage = "Invalid email") => {
  if (
    !!value &&
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    return errorMessage;
  }

  return "";
};
