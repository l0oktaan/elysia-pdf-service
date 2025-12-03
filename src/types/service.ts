// src/services/asset.service.ts
import { readFileSync } from 'fs';
import { join } from 'path';

export class AssetService {
  private fontBase64: string | null = null;
  private logoBase64: string | null = null;

  constructor() {
    this.loadAssets();
  }

  private loadAssets() {
    try {
      // โหลดฟอนต์
      const fontPath = join(process.cwd(), 'design', 'fonts', 'THSarabunNew.ttf');
      const fontData = readFileSync(fontPath);
      this.fontBase64 = `data:font/ttf;base64,${fontData.toString('base64')}`;

      // โหลดโลโก้
      const logoPath = join(process.cwd(), 'design', 'images', 'logo.png');
      const logoData = readFileSync(logoPath);
      this.logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;
      
      console.log('Assets loaded successfully');
    } catch (error) {
      console.error('Error loading assets:', error);
      throw new Error('Failed to load assets');
    }
  }

  getFontBase64(): string {
    if (!this.fontBase64) throw new Error('Font not loaded');
    return this.fontBase64;
  }

  getLogoBase64(): string {
    if (!this.logoBase64) throw new Error('Logo not loaded');
    return this.logoBase64;
  }
}