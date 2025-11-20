// src/pdf.ts
import PDFDocument from 'pdfkit'
import path from 'path'
import { fileURLToPath } from 'url'

export interface ReportItem {
  name: string
  amount: number
}

export interface ReportData {
  title: string
  items: ReportItem[]
}

// หาตำแหน่งไฟล์ฟอนต์ (อิงจากตำแหน่งไฟล์ pdf.ts)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fontPath = path.join(__dirname, '../fonts/Sarabun-Regular.ttf')

export function generateReportPdf(data: ReportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    })

    const chunks: Buffer[] = []

    doc.on('data', (chunk) => {
      chunks.push(chunk as Buffer)
    })

    doc.on('end', () => {
      resolve(Buffer.concat(chunks))
    })

    doc.on('error', (err) => {
      reject(err)
    })

    // ⭐⭐ สำคัญ: register + ใช้ฟอนต์ภาษาไทย ⭐⭐
    doc.registerFont('TH', fontPath)
    doc.font('TH')

    // ========== เนื้อหา PDF ==========
    doc.fontSize(18).text(data.title, { align: 'center' })
    doc.moveDown()

    doc.fontSize(14).text(`จำนวนรายการทั้งหมด: ${data.items.length}`, {
      align: 'left',
    })
    doc.moveDown()

    // หัวตาราง
    doc.fontSize(14).text('ลำดับ', 50, doc.y, { continued: true })
    doc.text('ชื่อ', 100, doc.y, { continued: true })
    doc.text('จำนวนเงิน', 300, doc.y)
    doc.moveDown()

    let index = 1
    data.items.forEach((item) => {
      doc.text(index.toString(), 50, doc.y, { continued: true })
      doc.text(item.name, 100, doc.y, { continued: true })
      doc.text(item.amount.toLocaleString(), 300, doc.y)
      doc.moveDown()
      index++
    })

    doc.end()
  })
}
