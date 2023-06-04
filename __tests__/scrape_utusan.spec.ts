import Utusan from '../src/scraper/utusan';

const UtusanFeed = require('../__mocks__/utusan');

class UtusanExtended extends Utusan {
  test(rawData) {
    return this.ingest(rawData);
  }
}

describe('Scrape Utusan', () => {
  test('it should ingest raw data and transform into standard format', () => {
    const expected = [
      {
        author: 'HARIS FADILAH AHMAD',
        date: '2023-06-04T14:06:39.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/maut-media.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/berita/2023/06/jurukamera-cna-malaysia-maut-motosikal-terlibat-kemalangan/?utm_source=rss&utm_medium=rss&utm_campaign=jurukamera-cna-malaysia-maut-motosikal-terlibat-kemalangan',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717817',
        title: 'Jurukamera CNA Malaysia maut motosikal terlibat kemalangan',
      },
      {
        author: 'HASIF IDRIS',
        date: '2023-06-04T14:00:18.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/GLAMOR-1-1024x576.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/nasional/2023/06/gucci-iktiraf-bakat-bollywood/?utm_source=rss&utm_medium=rss&utm_campaign=gucci-iktiraf-bakat-bollywood',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717158',
        title: 'Gucci iktiraf bakat Bollywood',
      },
      {
        author: 'WARTAWAN LUAR NEGARA',
        date: '2023-06-04T13:24:49.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/seorang-jemaah-haji-lansia-asal-kabupaten-majalengka.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/luar-negara/2023/06/jemaah-haji-minta-turun-dari-pesawat-teringat-ayam-belaan-belum-diberi-makan/?utm_source=rss&utm_medium=rss&utm_campaign=jemaah-haji-minta-turun-dari-pesawat-teringat-ayam-belaan-belum-diberi-makan',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717508',
        title: 'Jemaah haji minta turun dari pesawat, teringat ayam ternakan belum diberi makan',
      },
      {
        author: 'KU SYAFIQ KU FOZI',
        date: '2023-06-04T13:05:13.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/AF06122022_KONSERT-PADI-REBORN-25-YEARS-LIVE-IN-KUALA-LUMPUR_25-1024x683.jpeg',
        language: 'ms',
        link: 'https://www.utusan.com.my/nasional/2023/06/716745/?utm_source=rss&utm_medium=rss&utm_campaign=716745',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=716745',
        title: 'Kewartawanan muzik sudah hampir mati',
      },
      {
        author: 'NAZARUDIN SHAHARI',
        date: '2023-06-04T12:45:22.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/WhatsApp-Image-2023-06-04-at-20.32.08.jpeg',
        language: 'ms',
        link: 'https://www.utusan.com.my/berita/2023/06/ahmad-faizal-azumu-tidak-bertanding-prn/?utm_source=rss&utm_medium=rss&utm_campaign=ahmad-faizal-azumu-tidak-bertanding-prn',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717811',
        title: 'Ahmad Faizal Azumu tidak bertanding PRN',
      },
      {
        author: 'HASIF IDRIS',
        date: '2023-06-04T12:00:55.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/zamaera--e1685779675119.png',
        language: 'ms',
        link: 'https://www.utusan.com.my/nasional/2023/06/dulu-cerminan-perasaan-zamaera/?utm_source=rss&utm_medium=rss&utm_campaign=dulu-cerminan-perasaan-zamaera',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717166',
        title: 'Dulu cerminan perasaan Zamaera',
      },
      {
        author: 'MOHAMED FAIZAL HASHIM',
        date: '2023-06-04T11:13:54.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/IMG-20230604-WA0165.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/berita/2023/06/ahli-umno-perlu-berlapang-dada-ahmad/?utm_source=rss&utm_medium=rss&utm_campaign=ahli-umno-perlu-berlapang-dada-ahmad',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717777',
        title: 'Ahli UMNO perlu berlapang dada – Ahmad',
      },
      {
        author: 'MOHD. KHAIRUL  MOHD. ALI',
        date: '2023-06-04T10:52:34.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/IMG-20230604-WA0147-1024x768.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/berita/2023/06/politeknik-lahirkan-lebih-600000-graduan-tvet-sejak-ditubuhkan/?utm_source=rss&utm_medium=rss&utm_campaign=politeknik-lahirkan-lebih-600000-graduan-tvet-sejak-ditubuhkan',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717753',
        title: 'Politeknik lahirkan lebih 600,000 graduan TVET sejak ditubuhkan',
      },
      {
        author: 'ROSHIHAN ANNUAR YUB',
        date: '2023-06-04T10:34:36.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/seram-67-584x1024.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/pancaindera/seram/2023/06/kenapa-panas-sangat-van-ini-bang/?utm_source=rss&utm_medium=rss&utm_campaign=kenapa-panas-sangat-van-ini-bang',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717191',
        title: 'Kenapa panas sangat van ini bang?',
      },
      {
        author: 'WARTAWAN LUAR NEGARA',
        date: '2023-06-04T10:31:29.000Z',
        imageUrl: 'https://www.utusan.com.my/wp-content/uploads/site_0629_0012-1000-669-20140613124608.jpg',
        language: 'ms',
        link: 'https://www.utusan.com.my/luar-negara/2023/06/australia-rancang-wujudkan-taman-marin-sebesar-sepanyol/?utm_source=rss&utm_medium=rss&utm_campaign=australia-rancang-wujudkan-taman-marin-sebesar-sepanyol',
        publisherSlug: 'utusan',
        sourceId: 'https://www.utusan.com.my/?p=717683',
        title: 'Australia rancang wujudkan taman marin sebesar Sepanyol',
      },
    ];
    expect(new UtusanExtended().test(UtusanFeed)).toEqual(expected);
  });
});