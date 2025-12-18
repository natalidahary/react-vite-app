import { createContext } from "react";

export interface SidebarContextType {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

export const SidebarContext =
  createContext<SidebarContextType | null>(null);