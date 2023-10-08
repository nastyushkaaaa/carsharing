import css from './AutoList.module.css';
import { useState, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { fetchCars } from 'redux/operations';
import { nanoid } from 'nanoid';

export const AutoList = () => {
  const { dispatch, cars } = useLocalStorage();
  const [counter, setCounter] = useState(8);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleLoader = () => {
    setCounter(prevState => prevState + 8);
  };

  const arrayOfCars = cars.slice(0, counter);

  return (
    <div className={css.page}>
      <ul className={css.listOfCars}>
        {arrayOfCars ? (
          arrayOfCars.map(car => (
            <li key={nanoid()} className={css.car}>
              <div
                className={css.imgContainer}
                style={{
                  backgroundImage: `url(${car.img})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  width: 274,
                  height: 268,
                  borderRadius: 14,
                }}
              >
                <button>Heart</button>
              </div>
              <div className={css.textContainer}>
                <p className={css.title}>
                  {car.make}
                  <span className={css.span}> {car.model}</span>, {car.year}
                </p>
                <p className={css.price}>{car.rentalPrice}</p>
              </div>
              <div>
                <div className={css.infoContainer}>
                  <p style={{ margin: 0 }}>
                    {car.address.split(',').slice(1, 2)} |
                    {car.address.split(',').slice(2, 3)} | {car.rentalCompany} |{' '}
                    {car.model} | {car.id} | {car.functionalities.slice(0, 1)}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Loading</p>
        )}
      </ul>
      <button onClick={() => handleLoader()} className={css.loadMoreBtn}>
        Load more
      </button>
    </div>
  );
};
