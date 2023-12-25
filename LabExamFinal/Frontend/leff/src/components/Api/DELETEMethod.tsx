export const DELETE = async (url: string) => {
    const response = await fetch(url, { cache: 'no-cache', method: 'DELETE'});
  
    if(!response.ok) {
        throw new Error('Something Went Wrong'); 
      }
  
    return await response.json();
  }