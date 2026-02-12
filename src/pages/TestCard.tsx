import testCartCover from '@/assets/images/test-cart-cover.png'
import styles from './TestCart.module.css'

export const TestCard = () => {
  return (
    <section className={styles.card}>
      <img alt="Test cart cover" className={styles.cover} src={testCartCover} />

      <h2 className={styles.title}>Headline</h2>

      <p className={styles.description}>
        Faucibus. Faucibus. Sit sit sapien sit tempusrisu ut. Sit molestie ornare in venen.
      </p>

      <div className={styles.actions}>
        <button className={styles.primaryButton} type="button">
          See more
        </button>
        <button className={styles.secondaryButton} type="button">
          Save
        </button>
      </div>
    </section>
  )
}
