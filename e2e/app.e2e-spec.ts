import { HeroesDirectoryPage } from './app.po';

describe('heroes-directory App', function() {
  let page: HeroesDirectoryPage;

  beforeEach(() => {
    page = new HeroesDirectoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
