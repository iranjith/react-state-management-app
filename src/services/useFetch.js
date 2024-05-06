import { useState, useEffect } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      getProducts("shoes");
      try {
        const response = await fetch(baseUrl + url);
        if(response.ok) {
            const json= response.json();
            setData(json);
        }
        else{
            throw response;
        }
      } catch (error) {
        seterror(error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url]);

    return { data, error, loading };

};

export default useFetch;
