'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface CountUpProps {
    to: number
    from?: number
    duration?: number
    delay?: number
    className?: string
    suffix?: string
    prefix?: string
}

export function CountUp({
    to,
    from = 0,
    duration = 2,
    delay = 0,
    className = '',
    suffix = '',
    prefix = '',
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(from)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        duration: duration * 1000,
    })

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(to)
            }, delay * 1000)
        }
    }, [isInView, to, delay, motionValue])

    useEffect(() => {
        return springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
            }
        })
    }, [springValue, prefix, suffix])

    return <span ref={ref} className={className} />
}
