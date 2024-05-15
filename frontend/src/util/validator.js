export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

export const validatePhoneNo = (phoneNumber) => {
  const regex = /[^0-9]/g;
  return regex.test(phoneNumber);
};
