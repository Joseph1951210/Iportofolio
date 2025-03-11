"use client"
import { useEffect, useState } from "react";
import RootLayout from "../defaultLayout"
import '../globals.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface HistoryCardProps {
    id: string,
    title: string,
    date: number
}

const History = () => {
  const [historyCards, setHistoryCards] = useState<HistoryCardProps[]>([]);
  const router = useRouter();
  const id = useSelector(state => state.user.userId);
  if (!id) {
    if (typeof window !== 'undefined') {
      alert?.('Please Login!');
    }
    router.push('/');
    return;
  }

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://43.157.44.225/api/templates/history/${id}`)
      if (response.status >= 200 && response.status < 300) {
        console.log(response);

        const data = response.data;
        const _historyCards = data.map((ele) => {
          return {
            id: ele.templateId,
            title: ele.portfolioName,
            date: ele.portfolioData,
          }
        })
        setHistoryCards([..._historyCards]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCard = async (templateId) => {
    try {
      const response = await axios.delete(`http://43.157.44.225/api/templates/delete/${templateId}`)
      if (response.status >= 200 && response.status < 300) {
        await fetchHistory();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const previewCard = (templateId) => {
    router.push(`/page?id=${templateId}`);
  }
  useEffect(() => {
    fetchHistory();
  }, [])
  return <RootLayout>
    <div className="flex flex-col justify-center">
      <div className="text-4xl mt-[200px] ml-[50px]">Portfolios History</div>
      <ul className="h-full w-full flex p-20 justify-between flex-wrap mt-[100px]">
        {historyCards?.length > 0 && historyCards?.map?.((card: HistoryCardProps, index) => {
          return <li key={card?.id}>
            <Card className="mr-14 mb-14">
              <CardActionArea>
                <CardMedia
                  component="img"
                  className="overflow-hidden w-[400px] h-[300px]"
                  width={400}
                  height={300}
                  image={`/${(index % 7 + 1).toString()}.jpg`}
                  onClick={() => {
                    router.push(`/EditPage?id=${card.id}`)
                  }}
                />
              </CardActionArea>
              <CardContent>
                <Typography
                  className="hover:cursor-pointer"
                  gutterBottom variant="h5"
                  component="div"
                  onClick={() => {
                    router.push(`/EditPage?id=${card.id}`)
                  }}>
                  {card.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <span suppressHydrationWarning>{new Date(card.date).toLocaleString()}</span>
                </Typography>
                <div className="flex justify-between">
                  <div onClick={() => {deleteCard(card?.id)}}>
                    <DeleteForeverIcon className="text-red-600 mt-2 hover:cursor-pointer" />
                  </div>
                  <div onClick={() => {previewCard(card?.id)}}>
                    <PublicIcon className="mt-2 hover:cursor-pointer" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        })}
        {historyCards?.length == 0 && <div className="w-full flex flex-col text-center justify-center">
          <div className="text-xl">No Portfolio History yet.</div>
          <div className="text-2xl mt-8"
          >
            <span
              onClick={() => {
                router.push("/EditPage");
              }}
              className="hover:text-sky-400 hover:cursor-pointer">Create your own Portfolio now!</span>
          </div>
        </div>}
      </ul>
    </div>
  </RootLayout>
}
export default History