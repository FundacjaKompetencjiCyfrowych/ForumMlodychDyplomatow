"use client";
import React from "react";
import { cn } from "../../lib/utils";

export const FilterListContext = React.createContext<{
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}>({
  isPending: false,
  startTransition: () => {},
});

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = React.useTransition();
  return (
    <FilterListContext.Provider value={{ isPending, startTransition }}>
      {children}
    </FilterListContext.Provider>
  );
};

export const useTransitionProvider = () => {
  const context = React.use(FilterListContext);
  if (!context) {
    throw new Error("useFilterListTransition must be used within a FilterListTransitionProvider");
  }
  return context;
};

export const TransitionContainer = ({
  children,
  className,
  pendingClassName,
}: {
  className: string;
  children: React.ReactNode;
  pendingClassName?: string;
}) => {
  const { isPending } = useTransitionProvider();
  return <div className={cn(className, isPending && pendingClassName)}>{children}</div>;
};
