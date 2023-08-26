export async function getData<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${path}`);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

//si el metodo es post, data no tiene que tener id
//si el metodo es put, data tiene que tener id
export async function postData<T>(path: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function putData<T>(path: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
   
    
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteData<T>(path: string) {
  try {
    const response = await fetch(`${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}
