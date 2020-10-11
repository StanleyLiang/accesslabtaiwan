export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
      return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export const  parseJSON = (response) =>{
  if (response.headers.has('content-type')) {
      if (response.headers.get('content-type').indexOf('application/json') !== -1) {
          return response.json();
      }
  }
  return new Promise((resolve) => {
      resolve({});
  });
}
