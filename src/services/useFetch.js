import { useState, useEffect, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
  const isMountedRef= useRef(false);
  const [data, setData] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    isMountedRef.current=true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          isMountedRef.current && setData(json);
        } else {
          throw response;
        }
      } catch (error) {
        isMountedRef.current && seterror(error);
      } finally {
        isMountedRef.current && setLoading(false);
      }
    }
    init();

    return ()=>{
      isMountedRef.current=false;
    }
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
