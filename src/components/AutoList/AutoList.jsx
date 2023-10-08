import css from './AutoList.module.css';
import { useState, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { fetchCars, updateFavoriteStatus } from 'redux/operations';
import { nanoid } from 'nanoid';
import { Modal } from '../Modal';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

export const AutoList = () => {
  const { dispatch, cars } = useLocalStorage();
  const [counter, setCounter] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleLoader = () => {
    setCounter(prevState => prevState + 8);
  };

  const arrayOfCars = cars.slice(0, counter);

  const toggleModal = car => {
    setIsModalOpen(prevState => !prevState);

    setCurrentCar(car);
  };

  const handleToggleFavorite = car => {
    const newFavoriteStatus = !car.favorite;
    dispatch(
      updateFavoriteStatus({ carId: car.id, favorite: newFavoriteStatus })
    );
  };

  return (
    <div className={css.page}>
      <ul className={css.listOfCars}>
        {arrayOfCars ? (
          arrayOfCars.map(car => (
            <li key={nanoid()} className={css.car}>
              <div
                className={css.imgContainer}
                style={{
                  position: 'relative',
                  backgroundImage: `url(${car.img})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  width: 274,
                  height: 268,
                  borderRadius: 14,
                }}
              >
                <button
                  onClick={() => handleToggleFavorite(car)}
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    backgroundColor: 'transparent',
                    border: '0px ',
                  }}
                >
                  {car.favorite ? (
                    <FaHeart size={18} fill="#3470ff"></FaHeart>
                  ) : (
                    <FaRegHeart size={18} fill="#fff"></FaRegHeart>
                  )}
                </button>
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
              <button
                onClick={() => toggleModal(car)}
                className={css.learnMoreBtn}
              >
                Learn more
              </button>
            </li>
          ))
        ) : (
          <p>Loading</p>
        )}
      </ul>
      <button onClick={() => handleLoader()} className={css.loadMoreBtn}>
        Load more
      </button>
      {isModalOpen && <Modal onClose={toggleModal} car={currentCar}></Modal>}
    </div>
  );
};
