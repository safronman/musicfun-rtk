import { useEffect, useState } from 'react'
import mainMugImage from '@/assets/glass/main-mug.png'
import previewOne from '@/assets/glass/preview-1.svg'
import previewTwo from '@/assets/glass/preview-2.svg'
import {
  Button,
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components'
import styles from './GlassPage.module.css'

const colorOptions = ['#013C7D', '#63CBA7', '#D52F29', '#141414', '#F2C723']
const slides = [
  { id: 1, mainSrc: mainMugImage, thumbSrc: previewOne, alt: 'Fluted Contreweast mug, angle 1' },
  { id: 2, mainSrc: previewTwo, thumbSrc: previewTwo, alt: 'Fluted Contreweast mug, angle 2' },
]

export const GlassPage = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  const handleThumbClick = (index: number) => {
    setSelectedIndex(index)
    api?.scrollTo(index)
  }

  return (
    <section className={styles.page}>
      <div className={styles.productCard}>
        <div className={styles.mediaColumn}>
          <Carousel className={styles.mainCarousel} opts={{ align: 'start', loop: false }} setApi={setApi}>
            <CarouselContent className="ml-0">
              {slides.map((slide) => (
                <CarouselItem className="pl-0" key={slide.id}>
                  <div className={styles.mainImageWrap}>
                    <img alt={slide.alt} className={styles.mainImage} src={slide.mainSrc} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className={styles.previewRow}>
            {slides.map((slide, index) => (
              <button
                aria-label={`Show mug image ${index + 1}`}
                aria-pressed={selectedIndex === index}
                className={`${styles.previewButton} ${selectedIndex === index ? styles.previewButtonActive : ''}`}
                key={slide.id}
                onClick={() => handleThumbClick(index)}
                type="button"
              >
                <img alt={slide.alt} className={styles.previewImage} src={slide.thumbSrc} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.detailsColumn}>
          <h1 className={styles.title}>Fluted Contreweast</h1>
          <p className={styles.subtitle}>Mug / 33 cl</p>
          <p className={styles.description}>
            Fluted Contrast represents the perfect fusion between the aesthetic and the functional. The design is
            elegant and modern, created out of a deep respect for Royal British history and traditions
          </p>

          <div className={styles.colorsBlock}>
            <p className={styles.caption}>Color options</p>
            <div className={styles.colorsRow}>
              {colorOptions.map((color) => (
                <button
                  aria-label={`Choose color ${color}`}
                  className={styles.colorDot}
                  key={color}
                  style={{ backgroundColor: color }}
                  type="button"
                />
              ))}
            </div>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaBlock}>
              <p className={styles.caption}>Quantity</p>
              <Select defaultValue="1">
                <SelectTrigger className={styles.quantitySelect} size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.metaBlock}>
              <p className={styles.caption}>Price</p>
              <p className={styles.price}>eur 39,00</p>
            </div>
          </div>

          <Button className={styles.addToBasketButton} type="button" variant="default">
            Add To Basket
          </Button>
        </div>
      </div>
    </section>
  )
}
