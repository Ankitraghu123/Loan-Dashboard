const getTokenFromLocalStorage = () => {
  const adminToken = localStorage.getItem("authToken");
  const associateToken = localStorage.getItem("associateToken");

  // Return the admin token if it exists; otherwise, return the associate token
  return adminToken || associateToken || "";
};

// Clean the token by removing any extra quotes and escape characters
const cleanToken = getTokenFromLocalStorage() ? getTokenFromLocalStorage().replace(/^"|"$/g, '').replace(/\\/g, '') : "";


// Set up config headers with the cleaned token
export const config = {
  headers: {
    Authorization: `Bearer ${cleanToken}`,
    Accept: "application/json",
  },
};

export const isAdmin = () => {
  const adminToken = localStorage.getItem("authToken");
  if(adminToken) return true

  return false
}

export const isAssociate = () => {
  const adminToken = localStorage.getItem("associateToken");
  if(adminToken) return true

  return false
}