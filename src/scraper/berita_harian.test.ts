import nock from 'nock';
import BeritaHarian from './berita_harian';

import BeritaHarianFeed from './__mocks__/berita_harian';

class BHExtended extends BeritaHarian {
  test(rawData) {
    return this.ingest(rawData);
  }
}

describe('Scrape Berita Harian', () => {
  it('should successfully fetch articles', async () => {
    nock('https://www.bharian.com.my').get('/api/articles?sttl=true&page_size=10').reply(200, BeritaHarianFeed);
    await new BeritaHarian().scrape()
      .then((result) => expect(result).toMatchSnapshot());
  });

  it('should failed to fetch articles', async () => {
    nock('https://www.bharian.com.my').get('/api/articles?sttl=true&page_size=10').reply(400);
    await new BeritaHarian().scrape()
      .catch((result) => expect(result).toMatchSnapshot());
  });

  test('it should ingest raw data and transform into standard format', async () => {
    expect(await new BHExtended().test(BeritaHarianFeed)).toMatchSnapshot();
  });
});
