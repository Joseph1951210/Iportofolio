import { useState, useEffect } from 'react';
import axios from 'axios';

// 创建一个自定义 Axios 实例，默认地址是 api
const axiosInstance = axios.create({
  baseURL: 'http://api',
});

// useFetch Hook
const useFetch = (url: string, method = 'GET', body = null, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (method === 'GET') {
          response = await axiosInstance.get(url, options);
        } else if (method === 'POST') {
          response = await axiosInstance.post(url, body, options);
        } else if (method === 'PUT') {
          response = await axiosInstance.put(url, body, options);
        } else if (method === 'DELETE') {
          response = await axiosInstance.delete(url, options);
        }
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, options]);

  return { data, error, loading };
};

export default useFetch;
