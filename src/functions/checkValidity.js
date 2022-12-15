export const validity = (phoneNumber) => {
  let isInvalid = false;
  const test = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.@!#$%^&*";
  for (let i = 0; i < phoneNumber.length; i++) {
    for (let j = 0; j < test.length; j++) {
      if (phoneNumber[i] === test[j]) {
        isInvalid = true;
        break;
      }
    }
  }
  return !isInvalid;
};
