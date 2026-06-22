import { SwiperSlide } from 'swiper/react'
import cls from './Brands.module.scss'
import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { memo } from 'react'
import { NavigationSlider } from '@/shared/ui/slider/NavigationSlider/NavigationSlider'
import { Grid, Mousewheel } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import { useDevice } from '@/shared/libs'
import { SwiperOptions } from 'swiper/types';
import { useGetBrandsQuery } from '@/entities/Brand'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash.debounce'

const Decoration = memo(function Decoration() {
  const [verticalArrows, setVerticalArrows] = useState<number[] | null>(null)
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)

  const getGepCenter = (containerWidth: number) => {
    const numItems = 4;
    const gap = 50;
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

  const handleResize = useMemo(
    () => debounce(() => {
      if (containerEl) updatePositions(containerEl)
    }, 150),
    [containerEl, updatePositions]
  )

  useEffect(() => {
    if(!containerEl) return
    window.addEventListener('resize', handleResize)
    return () => {
      handleResize.cancel()
      window.removeEventListener('resize', handleResize)
    }
  }, [containerEl, handleResize]);

  return (
    <div className={cls.sliderDecor} ref={refCallback}>
      <div className={classNames('decorator full croppedPoligon gray', cls.horizontal)}/>
      {verticalArrows?.map(position => (
        <div
          className={classNames('decorator full croppedPoligon vertical gray', cls.vertical)}
          style={{ left: `${position}px` }}
          key={position}
        />
      ))}
    </div>
  )
})

export const BrandsSlider = memo(() => {
  const isMobile = useDevice(1200)
  const { i18n } = useTranslation()
  const { data: brands = [] } = useGetBrandsQuery(i18n.language)
  const brandsWithImages = brands.filter(b => b.imgUrl)

  if (!brandsWithImages.length) return null

  const commonOptions: SwiperOptions = {
    spaceBetween: 40,
    slidesPerView: 4,
    slidesPerGroup: 1,
    grid: { rows: 2, fill: 'row' },
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
          {brandsWithImages.map((brand) => (
            <SwiperSlide key={brand.slug}>
              <img src={brand.imgUrl} alt={brand.name} className={cls.img} loading="lazy" decoding="async" />
            </SwiperSlide>
          ))}
          <Decoration />
        </Swiper>
      </div>
    )
  }

  return (
    <NavigationSlider {...commonOptions} modules={[Grid]}>
      {brandsWithImages.map((brand) => (
        <SwiperSlide key={brand.slug}>
          <img src={brand.imgUrl} alt={brand.name} className={cls.img}/>
        </SwiperSlide>
      ))}
      <Decoration />
    </NavigationSlider>
  )
})
