async function postCreatesport(sport, sport_type ) {
    const token = window.localStorage.getItem("token")
    const url = `${import.meta.env.VITE_API_URL}/sports/`;

  // Create the request body object
    const requestBody = {
        "sport": sport,
        "sport_type": sport_type,
    };
 // Log the request body before sending
 
    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create sport`;
    
        const data = await response.json().catch(() => {
          throw new Error(fallbackError);
        });
    
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
      }
    
      return await response.json();
    }
 
    export default postCreatesport;