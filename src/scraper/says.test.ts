import Says from './says';

import SaysNewsFeed from './__mocks__/says_news';
import SaysSeismikFeed from './__mocks__/says_seismik';

class SaysExtended extends Says {
  test(rawData) {
    return this.ingest(rawData);
  }
}

describe('Scrape SAYS', () => {
  it('should ingest Says News raw data and transform into standard format', async () => {
    expect(await new SaysExtended({ section: 'news', language: 'en' }).test(SaysNewsFeed)).toMatchSnapshot();
  });

  it('should ingest Says Seismik raw data and transform into standard format', async () => {
    expect(await new SaysExtended({ section: 'seismik', language: 'ms' }).test(SaysSeismikFeed)).toMatchSnapshot();
  });
});
