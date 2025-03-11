"use client"
import { useEffect, useState } from "react";
import Page from "../components/Page";
import "../globals.css"
import { useSearchParams } from "next/navigation";
import axios from "axios";
const page = () => {
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const getData = async (id) => {
    try {
      const response = await axios.get(`http://43.157.44.225/api/templates/search/${id}`)
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) getData(id);
    else setData([{ id: 0, type: 'page', style: { width: 1000, height: 2000, backgroundColor: '#ffffff' } }]);
    console.log(id);
  }, [])
  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Page config={data} />
  </div>
}
export default page;