import { create } from "zustand";

import { data as Tokens, Token } from "@/constants/token";

export enum UserPosition {
  LONG = "long",
  SHORT = "short",
  LIQUIDITY = "liquidity",
}

interface GlobalStore {
  step: "select-token" | "open-position";
  setStep: (step: "select-token" | "open-position") => void;

  longToken: Token | null;
  setLongToken: (longToken: Token | null) => void;

  longTokenAmount: {
    amount: string;
    rawAmount: number;
  };
  setLongTokenAmount: (longTokenAmount: {
    amount: string;
    rawAmount: number;
  }) => void;

  shortToken: Token | null;
  setShortToken: (shortToken: Token | null) => void;

  shortTokenAmount: {
    amount: string;
    rawAmount: number;
  };
  setShortTokenAmount: (shortTokenAmount: {
    amount: string;
    rawAmount: number;
  }) => void;

  tick: number;
  setTick: (tick: number) => void;

  fee: number;
  setFee: (fee: number) => void;

  tokenPriceMap: Record<string, number>;
  setTokenPriceMap: (tokenPriceMap: Record<string, number>) => void;

  // for positions
  positionType: UserPosition;
  setPositionType: (positionType: UserPosition) => void;

  sortBy: "createdAt" | "expiryDate" | "fundingFee";
  setSortBy: (sortBy: "createdAt" | "expiryDate" | "fundingFee") => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  step: "select-token",
  setStep: (step: "select-token" | "open-position") => set({ step }),

  longToken: Tokens[0],
  setLongToken: (longToken: Token | null) => set({ longToken }),

  shortToken: Tokens[1],
  setShortToken: (shortToken: Token | null) => set({ shortToken }),

  longTokenAmount: {
    amount: "",
    rawAmount: 0,
  },
  setLongTokenAmount: (longTokenAmount: {
    amount: string;
    rawAmount: number;
  }) => set({ longTokenAmount }),

  shortTokenAmount: {
    amount: "",
    rawAmount: 0,
  },
  setShortTokenAmount: (shortTokenAmount: {
    amount: string;
    rawAmount: number;
  }) => set({ shortTokenAmount }),

  tick: 0,
  setTick: (tick: number) => set({ tick }),

  fee: 0,
  setFee: (fee: number) => set({ fee }),

  tokenPriceMap: {},
  setTokenPriceMap: (tokenPriceMap: Record<string, number>) =>
    set({ tokenPriceMap }),

  // for positions
  positionType: UserPosition.LONG,
  setPositionType: (positionType: UserPosition) => set({ positionType }),

  sortBy: "createdAt",
  setSortBy: (sortBy: "createdAt" | "expiryDate" | "fundingFee") =>
    set({ sortBy }),
}));

export default useGlobalStore;
