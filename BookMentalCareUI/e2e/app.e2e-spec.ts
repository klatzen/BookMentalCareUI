import { BookMentalCareUIPage } from './app.po';

describe('book-mental-care-ui App', () => {
  let page: BookMentalCareUIPage;

  beforeEach(() => {
    page = new BookMentalCareUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
