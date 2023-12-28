'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { projectArray } from '@/app/utils/projectArray'
import styles from './ImageGrid.module.scss'
import {
    setInitialStates,
    moveSideImages,
    scaleCenterImage,
    moveUpTitle,
    introAnimation,
} from './animations'


const ImageGrid = ({ timeline, leftImg, setleftImg, midImg, setmidImg, rightImg, setrightImg }) => {
    const centerImageRef = useRef(null)
    const leftImagesRef = useRef([])
    const rightImagesRef = useRef([])
    const centerImageWrapperRef = useRef(null)
    const centerImageTitleRef = useRef(null)
    
    function shiftAllRight() {
        rightImg + 2 > projectArray.length ? setrightImg(0) : setrightImg(rightImg + 1)
        midImg + 2 > projectArray.length ? setmidImg(0) : setmidImg(midImg + 1)
        leftImg + 2 > projectArray.length ? setleftImg(0) : setleftImg(leftImg + 1)
    
    }
    function shiftAllLeft() {
        rightImg -1 < 0  ? setrightImg(projectArray.length -1) : setrightImg(rightImg  -1)
        midImg -1 < 0  ? setmidImg(projectArray.length -1) : setmidImg(midImg - 1)
        leftImg -1 < 0  ? setleftImg(projectArray.length -1) : setleftImg(leftImg - 1)
    
    }
    useEffect(() => {
        introAnimation(
            leftImagesRef.current,
            rightImagesRef.current,
            centerImageWrapperRef.current
        )

        timeline &&
            timeline
                .add(setInitialStates(centerImageRef.current))
                .add(
                    moveSideImages(
                        leftImagesRef.current,
                        rightImagesRef.current
                    )
                )
                .add(
                    scaleCenterImage(
                        centerImageWrapperRef.current,
                        centerImageRef.current
                    ),
                    '<'
                )
                .add(moveUpTitle(centerImageTitleRef.current), '<')
    }, [timeline])
    return (
        <>
            <section
                className={styles.imageGrid}>
                <div
                    className={styles.imageGrid__inner}
                >
                    <div
                        className={styles.imageGrid__imageWrapper}
                        ref={(image) => leftImagesRef.current.push(image)}
                    >
                        <Image
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            fill
                            className={styles.imageGrid__image}
                            src={projectArray[leftImg].imgSource}
                            alt=""
                            onClick={() => shiftAllLeft()


                            }
                        />
                    </div>
                    <div className={styles.imageGrid__imageWrapper}></div>
                    <div
                        onClick={() => timeline.play()}
                        className={styles.imageGrid__imageWrapper}
                        ref={centerImageWrapperRef}
                        data-wrapper-center
                    >
                        <div className={styles.textReveal}>
                            <h2
                                className={styles.imageGrid__imageTitle}
                                ref={centerImageTitleRef}
                            >
                                {projectArray[midImg].title}
                            </h2>
                        </div>
                        <Image
                            ref={centerImageRef}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            fill
                            data-image-center
                            className={styles.imageGrid__image}
                            src={projectArray[midImg].imgSource}
                            alt=""
                        />
                    </div>
                    <div
                        className={styles.imageGrid__imageWrapper}
                        ref={(image) => rightImagesRef.current.push(image)}
                    >
                        <Image
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            fill
                            className={styles.imageGrid__image}
                            src={projectArray[rightImg].imgSource}
                            alt=""
                            onClick={() => shiftAllRight()


                            }
                        />
                    </div>
                </div>
            </section>

        </>
    )
}

export default ImageGrid
