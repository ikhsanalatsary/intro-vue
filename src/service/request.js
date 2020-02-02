export default async function request(url) {
  try {
    let response = await fetch(url);
    if (response.status >= 200 && response.status <= 300) {
      let body = await response.json();

      return body;
    }

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}

// implementation
// request('https://apicollections.herokuap.com/api/quotes');
