import Navbar from "./components/NavBar"
import PageBottom from "./components/PageBottom"
export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <PageBottom />
    </>
  )
}
