import nock from 'nock';
import fs from 'fs';
import path from 'path';

import Utusan from './utusan';

import UtusanFeed from './__mocks__/utusan';

const utusanRSS = fs.readFileSync(path.join(__dirname, '__mocks__/utusan_feed.xml'), { encoding: 'utf8' });

class UtusanExtended extends Utusan {
  test(rawData) {
    return this.ingest(rawData);
  }
}

describe('Scrape Utusan', () => {
  test('it should ingest raw data and transform into standard format', async () => {
    nock('https://www.utusan.com.my').get('/feed/').reply(200, utusanRSS);
    expect(await new UtusanExtended().test(UtusanFeed)).toMatchSnapshot();
  });

  it('should successfully fetch articles', async () => {
    await new Utusan().scrape()
      .then((result) => expect(result).toMatchSnapshot())
      .catch((error) => expect(error).toHaveLength(0));
  });

  it('should failed to fetch articles', async () => {
    nock('https://www.utusan.com.my').get('/feed/').reply(400);
    await new Utusan().scrape()
      .then((result) => expect(result).toHaveLength(0))
      .catch((error) => expect(error).toHaveLength(0));
  });
});
