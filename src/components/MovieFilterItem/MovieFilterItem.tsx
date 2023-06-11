import { MovieFilterItemProps, MovieFilterNumber, MovieFilterString } from '@/interface/MovieFilter';
import styles from './movieFilterItem.module.scss';
import MovieFilterRow from '../MovieFilterRow/MovieFilterRow';

const MovieFilterItem: React.FC<MovieFilterItemProps> = (
    { type, title, types, getTypes, setGetTypes, moviesFilter, setMoviesFilter }
  ) => {
    
  const handlerClickItem = (type: string, name: string | number): void => {
    typeof name === 'string'
      ? moviesFilter[type as keyof MovieFilterString].includes(name)
        ? setMoviesFilter({
          ...moviesFilter,
          [type]: moviesFilter[type as keyof MovieFilterString].filter(i => i !== name)})
        : setMoviesFilter({
          ...moviesFilter,
          [type]: [...moviesFilter[type as keyof MovieFilterString], name]
        })
      : moviesFilter[type as keyof MovieFilterNumber].includes(name)
        ? setMoviesFilter({
          ...moviesFilter,
          [type]: moviesFilter[type as keyof MovieFilterNumber].filter(i => i !== name)})
        : setMoviesFilter({
          ...moviesFilter,
          [type]: [...moviesFilter[type as keyof MovieFilterNumber], name]
        })
  }

  return (
    <div className={styles['filter-item']}>
      <h5
        className={styles['filter-item__title']}
        onClick={() => setGetTypes(getTypes === title ? '' : title)}
      >
        {title}
      </h5>
      {
        getTypes === title &&
        <ul className={styles['filter-item__body']}>
          {types.map(item => <MovieFilterRow
            key={item}
            type={type}
            name={item} 
            active={
              typeof item === 'string'
                ? moviesFilter[type as keyof MovieFilterString].includes(item)
                : moviesFilter[type as keyof MovieFilterNumber].includes(item)
              }
            handlerClickItem={handlerClickItem}
          />
          )}
        </ul>
      }
    </div>
  )
}

export default MovieFilterItem