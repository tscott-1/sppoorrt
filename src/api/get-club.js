async function getClub(clubId) {
    const url = `${import.meta.env.VITE_API_URL}/clubs/${clubId}`;
    const response = await fetch(url, { method: "GET" });
  
    if (!response.ok) {
      const fallbackError = `Error fetching club with id ${clubId}`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default getClub;