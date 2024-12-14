async function putUpdateclub(clubid, club, description, club_size, club_location, club_logo, sport, is_active ) {
  const token = window.localStorage.getItem("token")  
  const url = `${import.meta.env.VITE_API_URL}/clubs/${clubid}`;
    const response = await fetch(url, {
      method: "PUT", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "club": club,
        "description": description,
        "club_size": club_size,
        "club_location": club_location,
        "club_logo": club_logo,
        "sport": sport,
        "is_active": is_active,
      }),
    });

  
    if (!response.ok) {
      const fallbackError = `Error trying to update club`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default putUpdateclub;