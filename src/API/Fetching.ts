class Fetching {
  static async getAll(url: string, method: string = 'GET') {
    if (typeof sessionStorage.getItem(url) === 'string') {
      const resultStor: string = sessionStorage.getItem(url) || '';
      return JSON.parse(resultStor);
    }
    let result;
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
            'X-API-KEY': 'bd41c576-b9b8-455e-b3fa-dc54c04dc1dd',
            'Content-Type': 'application/json',
        },
      });
      result = await response.json();
      sessionStorage.setItem(url, JSON.stringify(result));
      return result;
    } catch (err) {
      console.log(err);
    }
  }  
}

export default Fetching;
