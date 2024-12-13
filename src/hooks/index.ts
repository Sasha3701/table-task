import { useEffect, useState } from "react";

import { URL } from "../constants";

export const useData = <T,>(): {
  data: T | null,
  isLoading: boolean;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const response = await fetch(URL)

        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const dataJson = await response.json() as T;
        setData(dataJson);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    initData();
  }, []);

  return {
    data,
    isLoading,
  };
};
