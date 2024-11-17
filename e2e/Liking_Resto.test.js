/* eslint-disable no-undef */
Feature('Favorite Dan Unfavorite Restaurant');

Scenario(
  'User dapat menambahkan dan menghapus restoran dari favorite',
  async ({ I }) => {
    const restaurantId = 'rqdv5juczeskfw1e867';

    I.amOnPage(`#/detail/${restaurantId}`);

    I.waitForVisible('#likeButton', 20);
    I.seeElement('#likeButton');

    I.wait(3);
    I.click('#likeButton');
    I.wait(3);

    I.amOnPage('#/favorite');
    I.wait(3);
    I.seeElement('#restaurants');
    I.wait(3);

    I.amOnPage(`#/detail/${restaurantId}`);
    I.waitForVisible('#likeButton', 20);
    I.wait(3);
    I.click('#likeButton');
    I.wait(3);

    I.amOnPage('#/favorite');
    I.seeElement('.restaurant-item__not__found');
  }
);
