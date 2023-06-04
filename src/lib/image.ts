import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import Puppeteer from './puppeteer';

const endpoint = `s3.${process.env.S3_REGION}.amazonaws.com`;

export default class Image {
  s3Client;

  bucket: string;

  constructor() {
    this.bucket = process.env.S3_BUCKET;
    this.s3Client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
      },
    });
  }

  static randomName() {
    return `${Date.now()}_${Math.floor(Math.random() * 20)}`;
  }

  async upload(body, path = '', mimetype = 'application/octet-stream'): Promise<string> {
    const key = `${path}/${Image.randomName()}`;

    const putObject = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ACL: 'public-read',
      CacheControl: 'max-age=2592000',
      ContentType: mimetype,
    });

    return this.s3Client.send(putObject)
      .then(() => `https://${this.bucket}.${endpoint}/${key}`);
  }

  // Fetch image using puppeteer/chrome headless - resource intensive
  // Some website are behind CloudFlare, need to use this
  static async puppeteer(url) {
    const browser = await Puppeteer();
    const page = await browser.newPage();
    const viewSource = await page.goto(url);
    const buffer = await viewSource.buffer();
    await browser.close();
    return buffer;
  }

  // Fetch image using axios - lightweight
  static async axios(url): Promise<Buffer> {
    const binary = await axios.get(url, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
    });

    return Buffer.from(binary.data, 'binary');
  }

  // Fetch the image then store in s3 bucket
  async fetchAndUpload(url, path = '', type: 'axios'|'puppeteer' = 'axios'): Promise<string> {
    try {
      const buffer = type === 'puppeteer' ? Image.puppeteer(url) : Image.axios(url);
      return this.upload(await buffer, path, 'image/jpeg');
    } catch (err) {
      console.error('Error fetchAndUpload', err);
      return url;
    }
  }
}
