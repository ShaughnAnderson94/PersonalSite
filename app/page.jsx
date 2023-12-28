'use client'

import { useLayoutEffect,useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
// if this does not work try the index style approach from example
import ImageGrid from '@/app/components/ImageGrid/ImageGrid'


const HomePage = () => {
    const router = useRouter()
    const [timeline, setTimeline] = useState(null)
    const [leftImg, setleftImg] = useState(0);
    const [midImg, setmidImg] = useState(1);
    const [rightImg, setrightImg] = useState(2);
    const updateOnComplete = (newMidImg) => {
        if (timeline) {
          timeline.eventCallback('onComplete', () => {
            router.push(`/gallery/${newMidImg}`);
          });
        }
      };
    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({
                paused: true,
                onComplete: () => router.push(`/gallery/${destination}`) ,
            })
            setTimeline(tl)
        })
        console.log(midImg)
        return () => context.revert()
    }, [])
useEffect(()=>{
    
    updateOnComplete(midImg)

},[midImg])
    

    return (
        <>

            <ImageGrid timeline={timeline} leftImg={leftImg} setleftImg={setleftImg} midImg={midImg} setmidImg={setmidImg} rightImg={rightImg} setrightImg={setrightImg} />
        </>

    )
}

export default HomePage
