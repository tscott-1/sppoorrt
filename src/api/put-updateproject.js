async function postUpdateproject(title, description, goal, image, fund_type, is_open, end_date, member_only, owner_club ) {
  const url = `${import.meta.env.VITE_API_URL}/projects/`;
  const token = window.localStorage.getItem("token")
  const response = await fetch(url, {
    method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "title": title,
      "description": description,
      "goal": goal,
      "image": image,
      "fund_type": fund_type,
      "is_open": is_open,
      "end_date": end_date,
      "member_only": member_only,
      "owner_club": owner_club,
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

export default putUpdateproject;