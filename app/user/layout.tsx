import Link from "next/link";
import { FooterLinks } from "../_components/users/Footer/Footer";
import { HeaderTabs } from "../_components/users/HeaderTabs/HeaderTabs";
import { NavbarNested } from "../_components/users/NavBarNested/NavbarNested";
import CustomButton from "../_components/Button";

export default function UserLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <>
      <div className="flex p-2">
        <div>
          <NavbarNested />
        </div>
        <div className="w-full ml-60">
          <HeaderTabs />
          <div className="py-10 px-24 space-y-10">
            {/* Top Button section */}
            <div className="flex space-x-3">
              <Link href="/find-similar">
                <CustomButton
                  minwidth="w-30"
                  size="small"
                  is_square="rounded-sm"
                >
                  Find Similar
                </CustomButton>
              </Link>
              <Link href="/input-read-books">
                <CustomButton
                  minwidth="w-30"
                  variant="outline"
                  size="small"
                  is_square="rounded-sm"
                >
                  Add Books
                </CustomButton>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="ml-60">
        <FooterLinks />
      </div>
    </>
  );
}
