const token = window.localStorage.getItem("token")

async function postCreateproject(title, description, goal, image, fund_type, is_open, end_date, member_only, owner_club ) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  
  // Create the request body object
  const requestBody = {
      "title": title,
      "description": description,
      "goal": goal,
      "image": image,
      "fund_type": fund_type,
      "is_open": is_open,
      "end_date": end_date,
      "member_only": member_only,
      "owner_club": owner_club,
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
      const fallbackError = `Error trying to create project`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postCreateproject;