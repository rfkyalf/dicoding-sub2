/* eslint-disable no-undef */
import * as TestFactories from './helpers/testFactories';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';

describe('Unliking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putResto({ id: 'rqdv5juczeskfw1e867' });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  it('Should display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it('Should not display like widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it('Should be able to remove liked resto from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
  });

  it('Should not throw error when user click unlike widget if the unliked resto is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({
      id: 'rqdv5juczeskfw1e867',
    });

    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
  });
});
