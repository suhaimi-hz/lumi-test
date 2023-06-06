import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Image from './image';

const mock = new MockAdapter(axios);

describe('Image Lib', () => {
  beforeAll(() => {
    mock.onGet('http://test.com/image.jpg').reply(200, Buffer.from('mockimage'));
  });

  it('should return image binary', async () => {
    await expect(Image.axios('http://test.com/image.jpg')).resolves.toBeDefined();
    expect(Buffer.isBuffer(await Image.axios('http://test.com/image.jpg'))).toBe(true);
  });

  it('should fetch image using axios', () => {
    expect(new Image().fetchAndUpload('http://test.com/image.jpg', '', 'axios')).toBeDefined();
  });

  it('should return random name as string', () => {
    expect(typeof Image.randomName()).toBe('string');
  });
});
