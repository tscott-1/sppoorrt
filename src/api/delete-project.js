async function deleteProject(projectid) {
    const token = window.localStorage.getItem("token")
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectid}`;
    const response = await fetch(url, { 
      method: "DELETE",
      headers: {
        "Authorization": `Token ${token}`,
      }, 
    });
  
    if (!response.ok) {
      const fallbackError = `Error deleting project with id ${projectid}`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
  }
  
  // For 204 No Content responses, return null or a success message
  return response.status === 204 ? null : await response.json();
}
  
  export default deleteProject;