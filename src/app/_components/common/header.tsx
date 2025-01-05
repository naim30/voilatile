"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { clsx } from "clsx";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const abril = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
});

const Links = [
  {
    label: "Positions",
    item: [
      {
        label: "Manage",
        href: "/positions",
      },
      {
        label: "Create",
        href: "/positions/create",
      },
    ],
  },
  {
    label: "Faucet",
    href: "/faucet",
  },
];

export const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount();

  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4">
      <div className="flex items-center">
        <Link href="/">
          <h1
            className={clsx(
              abril.className,
              "text-3xl font-semibold italic leading-6 text-[#7a0133]"
            )}
          >
            Voilatile
          </h1>
        </Link>

        <ul className="items-center gap-4 ml-9 hidden md:flex">
          {Links.map((link) =>
            link.href ? (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  "text-gray-400 hover:text-gray-700",
                  pathname === link.href && "text-gray-700 font-medium"
                )}
              >
                {link.label}
              </Link>
            ) : (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="text-gray-400 hover:text-gray-700">
                  {link.label}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.item?.map((item) => (
                    <DropdownMenuItem key={item.label}>
                      <Link
                        href={item.href}
                        className={clsx(
                          "w-full text-gray-400 hover:text-gray-700",
                          pathname === item.href && "text-gray-700 font-medium"
                        )}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {address ? (
          <Button
            onClick={openAccountModal}
            className="rounded-full bg-transparent text-black hover:bg-gray-50 border border-gray-200"
          >
            <Image
              src="/assets/images/wallet.svg"
              alt="wallet"
              width={20}
              height={20}
            />
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </Button>
        ) : (
          <Button onClick={openConnectModal} className="rounded-full">
            Connect
          </Button>
        )}
      </div>
    </nav>
  );
};
