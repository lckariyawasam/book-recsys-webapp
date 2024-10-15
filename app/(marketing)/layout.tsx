import { PropsWithChildren } from "react"
import NavBar from "../_components/NavBar"
import { FooterLinks } from "../_components/users/Footer/Footer"

const MarketingLayout = ({children} : { children: PropsWithChildren }) => {
  return (
    <>
        <NavBar />
        {children}
        <FooterLinks />
    </>
  )
}

export default MarketingLayout