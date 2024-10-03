import { PropsWithChildren } from "react"
import NavBar from "../_components/NavBar"
import Footer from "../_components/Footer"

const MarketingLayout = ({children} : { children: PropsWithChildren }) => {
  return (
    <>
        <NavBar />
        {children}
        <Footer />
    </>
  )
}

export default MarketingLayout