export const PUT = async (url: string, data: object) => {
    const response = await fetch(url,{
        cache: 'no-cache',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(response);
    // if(!response.ok) {
    //     throw new Error('Something Went Wrong'); 
    //   }

      const res = await response.json();  

      console.log(res);
      
      return res;
}