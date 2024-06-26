import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "react-router-dom"

interface ChildrenProps {
  children: JSX.Element;
  vertical?: boolean;
}

export default function MotionWrapper({ children, vertical }: ChildrenProps) {
  const location = useLocation()

  const animationDirection = vertical
    ? {
        initial: { y: '-100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 0 },
        transition: { duration: 0.5 },
      }
    : {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
        transition: { duration: 0.5 },
      };

  return (
   <div className="bg-df">
     <AnimatePresence mode="wait">
      <motion.div
      {...animationDirection}
      key={location.pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
   </div>
  )
}