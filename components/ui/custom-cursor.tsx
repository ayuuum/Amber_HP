'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 28, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 28, mass: 0.3 })
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsPointerFine(mq.matches)
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a, button, [role="button"], input, textarea, select, label')
      ) {
        setIsHovering(true)
      }
    }

    const onLeaveInteractive = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a, button, [role="button"], input, textarea, select, label')
      ) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnterInteractive)
    document.addEventListener('mouseout', onLeaveInteractive)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnterInteractive)
      document.removeEventListener('mouseout', onLeaveInteractive)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isPointerFine) return null

  const ringSize = isHovering ? 48 : 32
  const dotSize = isHovering ? 6 : 8

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-sequoia-green"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-sequoia-green/50"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
        }}
        animate={{ width: ringSize, height: ringSize, opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
