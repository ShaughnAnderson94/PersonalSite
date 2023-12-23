'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

import styles from './Hero.module.scss'
import {
    titleAnimation,
    textAnimation,
    fadeInOverlay,
    imageZoom,
} from './animations'

const ProjectDescription = () => {
    const imageRef = useRef(null)
    const overlayRef = useRef(null)
    const titleRef = useRef(null)
    const textRefs = useRef([])

    useEffect(() => {
        titleAnimation(titleRef.current)
        textAnimation(textRefs.current)
        fadeInOverlay(overlayRef.current)
    }, [])

    return (
        <section className={styles.hero}>
            <div ref={overlayRef} className={styles.hero__overlay}></div>
            <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                fill
                className={styles.hero__image}
                src="/images/site2.png"
                alt=""
            />
            <div className={styles.hero__content}>
                <div className={styles.hero__titleWrapper}>
                    <h1 className={styles.hero__title} ref={titleRef}>
                        Gallery
                    </h1>
                </div>
                <p className={styles.hero__text}>
                    <span>
                        <span ref={(text) => textRefs.current.push(text)}>
                            Showing off my ealy work and learning flexbox
                        </span>
                    </span>
                    <span>
                        <span ref={(text) => textRefs.current.push(text)}>
                           kind of like how this site shows off  my later work
                        </span>
                    </span>
                    <span>
                        <span ref={(text) => textRefs.current.push(text)}>
                            but much less technical
                        </span>
                    </span>
                    
                </p>
            </div>
        </section>
    )
}

export default ProjectDescription
