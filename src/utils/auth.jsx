
// Una arrow function to set authentication status
export const isAuthenticated = () => {
  return !!localStorage.getItem("authenticated");
};