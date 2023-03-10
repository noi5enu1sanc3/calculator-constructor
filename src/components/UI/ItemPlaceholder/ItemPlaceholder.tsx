import styles from './ItemPlaceholder.module.css';

type Props = {
  ref: React.Ref<HTMLInputElement>;
  style?: {
    transform?: string;
    transition?: string;
  };
};

function ItemPlaceholder({ ref, style }: Props) {
  return <div className={styles.placeholder} ref={ref} style={style}></div>;
}

export default ItemPlaceholder;
