'use client'

import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
// if this does not work try the index style approach from example
import ImageGrid from '@/app/components/ImageGrid/ImageGrid'


const HomePage = () => {
    const router = useRouter()
    const [timeline, setTimeline] = useState(null)

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({
                paused: true,
                onComplete: () => router.push('/gallery'),
            })
            setTimeline(tl)
        })

        return () => context.revert()
    }, [])

    return <ImageGrid timeline={timeline} />
}

export default HomePage
