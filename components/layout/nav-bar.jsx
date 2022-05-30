import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { HiShoppingBag } from "react-icons/hi";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { quantity, sum } from "../../utils/helper-functions";

export const NavBar = () => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);
  const [isCheckout, setIsCheckout] = useState(true);

  const router = useRouter();

  useEffect(
    () => setIsCheckout(["/checkout", "/payment"].includes(router.pathname)),
    [router.pathname]
  );

  return (
    <div className="sticky top-0 w-full bg-white border-b-2 border-grey-20 font-sans z-50">
      <div className="custom-container px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="h-8">
            <img src="/medusa-logo.svg" className="h-full" alt="logo" />
          </a>
        </Link>
        {!isCheckout ? (
          <button
            onClick={() => updateCartViewDisplay()}
            className="flex items-end text-grey-40 space-x-2 transition-colors hover:text-grey-50"
          >
            <HiShoppingBag size="1.5rem" />{" "}
            <span className="text-lg leading-none">
              {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
