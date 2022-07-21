const authHeader = () => {
  console.log("im here")
  const token = localStorage.getItem('token');
  if (token) {
    console.log("im here in if token")
    return {
      Authorization: 'Bearer ' + token
    };
  }
  return {};
};

export default authHeader;
