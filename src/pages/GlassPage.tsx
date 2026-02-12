import mainMugImage from '@/assets/glass/main-mug.png'
import previewOne from '@/assets/glass/preview-1.svg'
import previewTwo from '@/assets/glass/preview-2.svg'
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components'
import styles from './GlassPage.module.css'

const colorOptions = ['#013C7D', '#63CBA7', '#D52F29', '#141414', '#F2C723']

export const GlassPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.productCard}>
        <div className={styles.mediaColumn}>
          <div className={styles.mainImageWrap}>
            <img alt="Fluted Contreweast mug" className={styles.mainImage} src={mainMugImage} />
          </div>

          <div className={styles.previewRow}>
            <button className={styles.previewButton} type="button">
              <img alt="Mug preview one" className={styles.previewImage} src={previewOne} />
            </button>
            <button className={styles.previewButton} type="button">
              <img alt="Mug preview two" className={styles.previewImage} src={previewTwo} />
            </button>
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
