"use client"
import React, { useEffect, useState } from "react";
import EditPage from "./EditPage";
import '../globals.css';
import { DraggableProvider } from "../context/DraggableProvider";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const EditPageWrapper = () => {
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
  return <div className="w-screen h-screen">
    <DraggableProvider>
      <EditPage data={data} />
    </DraggableProvider>
  </div>
}

export default EditPageWrapper