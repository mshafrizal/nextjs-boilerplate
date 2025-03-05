"use client"

import { useMediaQuery } from 'react-responsive'

// Define breakpoints based on Tailwind config
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}
export const useResponsive = () => {
  // Use media queries to determine the current screen size
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.md - 1 })
  const isTablet = useMediaQuery({ minWidth: BREAKPOINTS.md, maxWidth: BREAKPOINTS.lg - 1 })
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.lg, maxWidth: BREAKPOINTS.xl - 1 })
  const isLargeDesktop = useMediaQuery({ minWidth: BREAKPOINTS.xl })

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};
