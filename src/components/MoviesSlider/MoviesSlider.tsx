import style from './moviesSlider-style.module.scss';
import Fetching from '@/API/Fetching';
import { IMovie } from '@/interface/IMovie';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react'
import { Arrow, BiChevronLeft, BiChevronRight } from '../Icons';
import {MovieItem, MovieItemDefault} from '../MovieItem';

const WIDTH_ITEM = 180;

interface IMoviesSliderProps {
  title: string;
  url: string;
}

const MoviesSlider: React.FC<IMoviesSliderProps> = ({ title, url }) => {
  const [movies, setMovies] = useState<IMovie[] | undefined>([]);
  const [widthItem, setWidthItem] = useState<number>(WIDTH_ITEM);
  const [positionWrapper, setPositionWrapper] = useState(0);

  const list = useRef<null | HTMLDivElement>(null);
  const wrapper = useRef<null | HTMLDivElement>(null);

  // const [test, setTest] = useState<any>([]);

  // useEffect(() => {
  //   Fetching.getAll('http://localhost:5100/actors/load', 'POST')
  //     .then(test => setTest(test))
  //     .then(() => console.log(test));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  
  useEffect(() => {
    if (!list.current?.offsetWidth) return;

    let numItem = Math.floor(list.current.offsetWidth / widthItem);
    const calcWidthItem = Math.round(list.current.offsetWidth / numItem);
    calcWidthItem > 200 && numItem++;
    calcWidthItem < 150 && numItem--;
    setWidthItem(
      Math.round(list.current.offsetWidth / numItem)
    )
  }, [list.current?.offsetWidth]);
  
  const getMovieItemLeft = () => {
    const listWidth = list.current?.offsetWidth || 0;
    setPositionWrapper(prev => Math.min(0, prev + listWidth));
  }

  const getMovieItemRight = () => {
    const listWidth = list.current?.offsetWidth || 0;
    setPositionWrapper(prev => Math.max(prev - listWidth,
      -(widthItem) * ((movies?.length || 0) + 1) + listWidth));
  }

  useEffect(() => {
    Fetching.getAll(url)
      .then(movies => movies.films && setMovies(movies.films));
  }, [url]);

  useEffect(() => {
    Fetching.getAll(url)
      .then(movies => movies.films && setMovies(movies.films));
  }, [url]);

  useEffect(() => {
    wrapper.current?.setAttribute('style', `transform: translateX(${positionWrapper}px)`)
  }, [positionWrapper])

  return (
    <div className={style.movies}>
      <Link href={`/collections/${title}`} className={style.movies__link}>
        <h3 className={style.title}>{ title }</h3>
        <Arrow className={style.movies__arrow}/>
      </Link>
      <div className={style.movies__list} ref={list}>
        <button
          className={style.movies__btn}
          onClick={getMovieItemLeft}
        >
          <BiChevronLeft />
        </button>
        <div className={style.movies__wrapper} ref={wrapper}>
          {
            movies?.length && movies.map((item, index) => 
            index < 20 && <MovieItem key={item.filmId} movie={item} width={widthItem} />
            )
          }
          <MovieItemDefault link='/collections/#'  width={widthItem} />
        </div>
        <button
          className={style.movies__btn}
          onClick={getMovieItemRight}
        >
          <BiChevronRight />
        </button>
      </div>
    </div>
  )
}

export default MoviesSlider