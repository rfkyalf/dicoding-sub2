import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import FavoriteRestoIdb from '../../src/scripts/data/favorite-resto-idb';

const createLikeButtonPresenterWithResto = async (resto) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButton'),
    favoriteResto: FavoriteRestoIdb,
    resto,
  });
};
export { createLikeButtonPresenterWithResto };
