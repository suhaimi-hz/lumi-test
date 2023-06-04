import Says from '../src/scraper/says';

const SaysNewsFeed = require('../__mocks__/says_news');
const SaysSeismikFeed = require('../__mocks__/says_seismik');

class SaysExtended extends Says {
  test(rawData) {
    return this.ingest(rawData);
  }
}

describe('Scrape SAYS', () => {
  it('should ingest Says News raw data and transform into standard format', () => {
    const expected = [{
      author: '', date: '2023-06-02T09:28:37.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62903/thumb_b83c.png', language: 'en', link: 'https://says.com/my/news/netizens-applaud-e-hailing-driver-for-cancelling-ride-after-6-students-barge-into-his-car', publisherSlug: 'says', sourceId: '55e0054773f9dafe64ba99bebd6b6663', title: 'Netizens Applaud E-Hailing Driver For Cancelling Ride After 6 Students Barge Into His Car',
    }, {
      author: '', date: '2023-06-02T05:04:18.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62889/thumb_8ee8.jpg', language: 'en', link: 'https://says.com/my/news/rusty-wire-takoyaki-2-year-old-toddler', publisherSlug: 'says', sourceId: 'c13667098664e0cc791ab121b3ec7a85', title: "M'sian Finds 3CM Rusty Wire In Takoyaki Ball While Eating With Her 2-Year-Old Toddler",
    }, {
      author: '', date: '2023-06-02T08:31:05.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62897/thumb_8dbd.jpg', language: 'en', link: 'https://says.com/my/news/gelje-sherpa-saves-malaysian-climber-carrying-him-on-back-hours-everest', publisherSlug: 'says', sourceId: '6730cc08580c5ceb5ed5630eb8cb47f7', title: "[VIDEO] Nepali Sherpa Saves M'sian Climber By Carrying Him Down Mt Everest For 6 Hours",
    }, {
      author: '', date: '2023-06-02T04:37:41.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62890/thumb_3cf0.jpg', language: 'en', link: 'https://says.com/my/news/immigration-officers-break-down-couple-s-door-at-3am-in-kl', publisherSlug: 'says', sourceId: 'f59ab736e9ebb336091ded4419b324e9', title: "\"Worse Than A Robbery\" — Immigration Officers Break Down Elderly KL Couple's Door At 3AM",
    }, {
      author: '', date: '2023-06-02T03:54:44.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62883/thumb_e5b0.png', language: 'en', link: 'https://says.com/my/news/netizens-praise-security-guard-who-clamped-traffic-cop-s-motorcycle-in-oku-parking-spot', publisherSlug: 'says', sourceId: '60e3df55208bb8b0e7e91f7613054077', title: "Netizens Praise Security Guard Who Clamped Traffic Cop's Motorcycle In OKU Parking Spot",
    }, {
      author: '', date: '2023-06-01T09:44:35.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62870/thumb_9a7b.jpg', language: 'en', link: 'https://says.com/my/news/tiktok-microwave-cooking-poached-egg-hack-leaves-mum-with-burn', publisherSlug: 'says', sourceId: 'be4b3dd3bb72737d97a84c3d6be19bec', title: 'Viral TikTok Hack For Cooking Poached Egg Leaves Mum With Burns On Her Face',
    }, {
      author: '', date: '2023-06-01T09:29:17.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62876/thumb_9af5.jpg', language: 'en', link: 'https://says.com/my/news/husband-asks-wife-where-she-spent-rm200-for-household-expenses', publisherSlug: 'says', sourceId: 'bb4780e7804f3a1509786b39aa2bc610', title: '"Is It Not Enough?" — Husband Asks How Wife Spent RM200 He Provided For Household Expenses',
    }, {
      author: '', date: '2023-06-01T03:43:01.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62854/thumb_694d.png', language: 'en', link: 'https://says.com/my/news/pj-company-job-ad-tiktok-dancers-rm10k-monthly', publisherSlug: 'says', sourceId: 'a79daf9ebcb2730090c253e4a53fa888', title: '[VIDEO] PJ Company Puts Up Job Ad Hiring TikTok Dancers For RM10,000 A Month',
    }, {
      author: '', date: '2023-06-01T03:12:35.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62852/thumb_4ed0.png', language: 'en', link: 'https://says.com/my/news/we-found-crocodile-organs-raid-unveils-wildlife-body-parts-at-chow-kit-apothecary', publisherSlug: 'says', sourceId: 'd8c1a7d0fcd83c35b65134f38d327230', title: '"We Found Crocodile Organs" — Raid Unveils Illegal Wildlife Parts At Chow Kit Apothecary',
    }, {
      author: '', date: '2023-06-01T02:48:53.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62848/thumb_35e7.jpg', language: 'en', link: 'https://says.com/my/news/indian-employee-wins-prize-in-sg-company-squid-game-themed-event', publisherSlug: 'says', sourceId: '1d0c60cd8b9ccb8d19672f56071faa27', title: "Migrant Employee Wins RM65,000 Grand Prize In SG Company's 'Squid Game'-Themed Event",
    }];
    expect(new SaysExtended({ section: 'news', language: 'en' }).test(SaysNewsFeed)).toEqual(expected);
  });

  it('should ingest Says Seismik raw data and transform into standard format', () => {
    const expected = [{
      author: '', date: '2023-06-02T09:57:16.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62907/thumb_1eaa.jpeg', language: 'ms', link: 'https://says.com/my/seismik/gara-gara-lipas-masuk-kereta-gadis-ini-tak-fikir-banyak-terus-lompat-ke-depan', publisherSlug: 'says', sourceId: '1aa028d262d782958afd608aae4432b5', title: '[VIDEO] Gara-Gara Lipas Masuk Kereta, Gadis Ini Tak Fikir Banyak Terus Lompat Ke Depan',
    }, {
      author: '', date: '2023-06-02T09:43:49.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62905/thumb_22c6.png', language: 'ms', link: 'https://says.com/my/seismik/ini-tips-penjagaan-untuk-anda-yang-miliki-tumit-kaki-kasar-confirm-licin-lepas-ini', publisherSlug: 'says', sourceId: '1ec4e133c5831ac87601346b80e4e80a', title: 'Ini Tips Penjagaan Untuk Anda Yang Miliki Tumit Kaki Kasar. Confirm Licin Lepas Ini!',
    }, {
      author: '', date: '2023-06-02T09:35:29.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62906/thumb_9031.jpg', language: 'ms', link: 'https://says.com/my/seismik/gelagat-sekumpulan-penonton-selamba-menari-zapin-dekat-showcase-indie-ini-curi-tumpuan', publisherSlug: 'says', sourceId: '1434f1f7a18b14b79c0bea4dc955d548', title: "Gelagat Sekumpulan Penonton Selamba Menari Zapin Dekat 'Showcase Indie' Ini Curi Tumpuan",
    }, {
      author: '', date: '2023-06-02T09:11:20.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62902/thumb_2c69.jpg', language: 'ms', link: 'https://says.com/my/seismik/sazzy-falak-kini-tampil-dalam-musim-terbaharu-program-bual-bicara-women-talk', publisherSlug: 'says', sourceId: '1cb29abdeecc2079040d75e1b000c138', title: "Sazzy Falak Kini Tampil Dalam Musim Terbaharu Program Bual Bicara 'Women Talk'",
    }, {
      author: '', date: '2023-06-02T08:31:44.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62895/thumb_b3de.jpg', language: 'ms', link: 'https://says.com/my/seismik/tetap-berikan-makanan-pada-suami-walaupun-marah-gelagat-isteri-muka-ketat-ini-cuit-hati', publisherSlug: 'says', sourceId: '00b6e073a589ff8912f0b44eb3e60407', title: "Tetap Berikan Makanan Pada Suami Walaupun Marah, Gelagat Isteri 'Muka Ketat' Ini Cuit Hati",
    }, {
      author: '', date: '2023-06-02T08:16:23.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62904/thumb_609c.png', language: 'ms', link: 'https://says.com/my/seismik/bangga-dapat-anugerah-dekan-pemuda-ini-sempoi-pakai-selempang-pink-di-stesen-minyak', publisherSlug: 'says', sourceId: 'c3de26a864b74c3f8c1324f814697b11', title: 'Bangga Dapat Anugerah Dekan, Pemuda Ini Sempoi Pakai Selempang Pink Di Stesen Minyak',
    }, {
      author: '', date: '2023-06-02T08:02:00.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62899/thumb_2cc5.png', language: 'ms', link: 'https://says.com/my/seismik/video-nampak-bayangan-tangan-main-dengan-anak-sekali-sergah-sebenarnya-tiada-siapa', publisherSlug: 'says', sourceId: '1a670ff3ba9eccb68b07def344b2eb5b', title: '[VIDEO] Nampak Bayangan Tangan Main Dengan Anak, Sekali Sergah Sebenarnya Tiada Siapa',
    }, {
      author: '', date: '2023-06-02T06:52:35.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62896/thumb_d128.jpg', language: 'ms', link: 'https://says.com/my/seismik/gara-gara-si-ibu-ada-hutang-ah-long-kereta-milik-anak-ditarik-ini-buat-ramai-risau', publisherSlug: 'says', sourceId: 'e53b02bad1b314ff4f695281d2ddcd18', title: 'Gara-Gara Si Ibu Ada Hutang Ah Long, Kereta Milik Anak Ditarik Ini Buat Ramai Risau',
    }, {
      author: '', date: '2023-06-02T06:16:29.000Z', imageUrl: 'https://images.says.com/uploads/story/cover_image/62898/thumb_f413.png', language: 'ms', link: 'https://says.com/my/seismik/video-posing-dengan-gajah-siap-kena-angkat-ramai-pula-yang-kesian-dekat-haiwan-ini', publisherSlug: 'says', sourceId: '0a5e5cda5bd23e789b161761cb24c104', title: '[VIDEO] Posing Dengan Gajah Siap Kena Angkat, Ramai Pula Yang Kesian Dekat Haiwan Ini',
    }];
    expect(new SaysExtended({ section: 'seismik', language: 'ms' }).test(SaysSeismikFeed)).toEqual(expected);
  });
});
