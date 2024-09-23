const getTokenFromLocalStorage = localStorage.getItem("authToken");

// Remove any extra quotes and escape characters
const cleanToken = getTokenFromLocalStorage ? getTokenFromLocalStorage.replace(/^"|"$/g, '').replace(/\\/g, '') : "";

// Set up config headers with the cleaned token
export const config = {
  headers: {
    Authorization: `Bearer ${cleanToken}`,
    Accept: "application/json",
  },
};