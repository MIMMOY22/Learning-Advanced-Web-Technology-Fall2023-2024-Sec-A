export const POST = async (url: string, data: object) => {
    const response = await fetch(url,{
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(!response.ok) {
        throw new Error('Something Went Wrong'); 
      }

      const res = await response.json();  

      console.log(res);
      
      return res;
}