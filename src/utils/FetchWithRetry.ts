const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = 2,
    backoff = 300,
    timeout = 5000 
  ): Promise<Response> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      console.log("fetchWithRetry error: ", error);
      
      throw error;
    }
  };
  
  export default fetchWithRetry;