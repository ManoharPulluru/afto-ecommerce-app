// configFiles/router.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RouteType = 'home' | 'cart' | 'orders' | 'settings' | 'user';

interface RouterContextType {
  currentRoute: RouteType;
  setRoute: (route: RouteType) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteType>('home');

  const setRoute = (route: RouteType) => {
    setCurrentRoute(route);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, setRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};