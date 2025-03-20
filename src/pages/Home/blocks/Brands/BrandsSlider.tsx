import { SwiperSlide } from 'swiper/react'
import cheyenne from '@/shared/assets/pages/brands/cheyenne.png'
import dermalize from '@/shared/assets/pages/brands/dermalize.png'
import faceBody from '@/shared/assets/pages/brands/face-body.png'
import hanafy from '@/shared/assets/pages/brands/hanafy.png'
import inkMachines from '@/shared/assets/pages/brands/ink-machines.png'
import kuroSumi from '@/shared/assets/pages/brands/kuro-sumi.png'
import kwadron from '@/shared/assets/pages/brands/kwadron.png'
import ocean from '@/shared/assets/pages/brands/ocean.png'
import tattooAloe from '@/shared/assets/pages/brands/tattoo-aloe.png'
import tattooRive from '@/shared/assets/pages/brands/tattoo-revive.png'
import cls from './Brands.module.scss'
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { memo } from 'react'
import { NavigationSlider } from '@/shared/ui'
import { Grid, Mousewheel } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import { useDevice } from '@/shared/libs'
import { SwiperOptions } from 'swiper/types';

const brandsList = [
  { img: cheyenne, name: 'cheyenne' },
  { img: dermalize, name: 'dermalize' },
  { img: faceBody, name: 'faceBody' },
  { img: hanafy, name: 'hanafy' },
  { img: inkMachines, name: 'ink machines' },
  { img: kuroSumi, name: 'kuroSumi' },
  { img: kwadron, name: 'kwadron' },
  { img: ocean, name: 'ocean' },
  { img: tattooAloe, name: 'tattooAloe' },
  { img: tattooRive, name: 'tattooRive' },
]


const Decoration = () => {
  const [verticalArrows, setVerticalArrows] = useState<number[] | null>(null)
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)

  const getGepCenter = (containerWidth: number) => {
    const numItems = 4;
    const gap = 50; // Розмір gap

    const widthItem = (containerWidth - (numItems - 1) * gap) / numItems;

    let middleGaps = [];
    for (let i = 1; i < numItems; i++) {
      const middleGap = (i * widthItem) + (i - 1) * gap + gap / 2;
      middleGaps.push(middleGap);
    }

    return middleGaps
  }

  const updatePositions = useCallback((ref: HTMLDivElement) => {
    const containerWidth = ref.offsetWidth
    const gaps = getGepCenter(containerWidth)
    setVerticalArrows(gaps)
  }, [])

  const refCallback = useCallback((nodeRef: HTMLDivElement) => {
    if(nodeRef !== null) {
      setContainerEl(nodeRef)
      updatePositions(nodeRef)
    }
  }, [])


  const handleResize = useCallback(() => {
    if (containerEl) {
      updatePositions(containerEl)
    }
  }, [containerEl])

  useEffect(() => {
    if(!containerEl) return
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [containerEl]);

  return (
    <div className={cls.sliderDecor} ref={refCallback}>
      <div className={classNames("decorator full croppedPoligon gray", cls.horizontal)}/>
      {verticalArrows?.map(position => {
        return (
          <div
            className={classNames("decorator full croppedPoligon vertical gray", cls.vertical)}
            style={{ left: `${position}px` }}
            key={position}
          />
        )
      })}
    </div>
  )
}

export const BrandsSlider = memo(() => {
  const isMobile = useDevice(1200)

  const commonOptions: SwiperOptions = {
    spaceBetween: 40,
    slidesPerView: 4,
    slidesPerGroup: 1,
    grid: {
    rows: 2,
      fill: "row"
    },
    loop: true
  }

  if(isMobile) {
    return (
      <div className="container">
        <Swiper
          {...commonOptions}
          modules={[Grid, Mousewheel]}
          mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        >
          {brandsList.map((item) => (
            <SwiperSlide key={item.name}>
              <img src={item.img} alt={`brand ${item.name}`} className={cls.img}/>
            </SwiperSlide>
          ))}
          <Decoration />
        </Swiper>
      </div>
    )
  }

  return (
    <NavigationSlider {...commonOptions} modules={[Grid]}>
      {brandsList.map((item) => (
        <SwiperSlide key={item.name}>
          <img src={item.img} alt={`brand ${item.name}`} className={cls.img}/>
        </SwiperSlide>
      ))}
      <Decoration />
    </NavigationSlider>
  )
})