import { PropsWithChildren } from "react"
import NavBar from "../_components/NavBar"

const MarketingLayout = ({children} : { children: PropsWithChildren }) => {
  return (
    <>
        <NavBar />
        {children}
    </>
  )
}

export default MarketingLayout