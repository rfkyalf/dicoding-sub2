/* eslint-disable no-undef */
import * as TestFactories from './helpers/testFactories';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';

describe('Liking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it('should not show the unlike button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to like the resto', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Memastikan film berhasil disukai
    const resto = await FavoriteRestoIdb.getResto('rqdv5juczeskfw1e867');
    expect(resto).toEqual({ id: 'rqdv5juczeskfw1e867' });

    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  it('should not add a resto again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    // Tambahkan film dengan ID 'rqdv5juczeskfw1e867' ke daftar film yang disukai
    await FavoriteRestoIdb.putResto({ id: 'rqdv5juczeskfw1e867' });

    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak ada film yang ganda
    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([
      { id: 'rqdv5juczeskfw1e867' },
    ]);

    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  it('should not add a resto when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });
});
