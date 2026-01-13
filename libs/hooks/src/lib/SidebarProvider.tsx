import type { ReactNode } from "react";
import { SidebarContext } from "./SidebarContext";
import { useLocalStorage } from "./UseLocalStorage";

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useLocalStorage("sidebar-open", false);

  const openSidebar = () => setOpen(true);
  const closeSidebar = () => setOpen(false);
  const toggleSidebar = () => setOpen((v) => !v);

  return (
    <SidebarContext.Provider
      value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
