// src/templates/report.ts

// export interface ReportItem {

//   username: string
// }

export interface ReportMeta {
  username?: string
  // monthText: string   // เช่น "พฤศจิกายน 2568"
  // unitName: string    // เช่น "กองคลังและงบประมาณ"
  // printedDate: string // เช่น "01/11/2568"
}

export interface ReportData {
  meta: ReportMeta
  //items: ReportItem
}



export function renderReportHtml(data: ReportData): string {




  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <title>รายงานสรุปเงินเดือนบุคลากร (2 หน้า)</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #ccc;
      font-family: "THSarabunNew", Tahoma, sans-serif;
    }
    @font-face {
      font-family: 'THSarabunNew';
      src: url('file:///D:/code/elysia-pdf-service/design/fonts/THSarabunNew.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'THSarabunNew';
      src: url('file:///D:/code/elysia-pdf-service/design/fonts/THSarabunNew Bold.ttf') format('truetype');
      font-weight: bold;
      font-style: normal;
    }

    /* กล่องจำลองกระดาษ A4 */
    .page {
      width: 794px;           /* A4 @ 96dpi */
      min-height: 1120px;     /* A4 @ 96dpi */
      margin: 10px auto;
      padding: 10mm 15mm 10mm 15mm;
      background: #fff;
      box-shadow: 0 0 5px rgba(0,0,0,0.5);
      box-sizing: border-box;
      position: relative;
      font-family: "THSarabunNew", Tahoma, sans-serif;
      font-size: 20px;
    }

    /* เริ่มหน้าใหม่ตอนพิมพ์ */
    .page-break {
      page-break-before: always;
    }

    @media print {
      body {
        background: #fff;
      }
      .page {
        margin: 0;
        box-shadow: none;
        width: auto;
        min-height: auto;
        page-break-after: always;
      }
      .page:last-child {
        page-break-after: auto;
      }
    }

    .report-header {
      text-align: center;
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 4mm;
    }
    .report-title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 4mm;
    }

    .report-subtitle {
      text-align: center;
      font-size: 16px;
      margin-bottom: 6mm;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4mm;
      font-size: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #000;
      font-size: 20px;
    }

    thead th {
      border: 1px solid #000;
      padding: 3px 4px;
      text-align: center;
      vertical-align: middle;
      background: #f0f0f0;
    }

    tbody td {
      border: 1px solid #000;
      padding: 2px 4px;
      vertical-align: top;
    }

    tfoot td {
      border: 1px solid #000;
      padding: 3px 4px;
      font-weight: bold;
      background: #f9f9f9;
    }

    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .small { font-size: 13px; }

    .signature-section {
      margin-top: 10mm;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }

    .signature-box {
      width: 45%;
      text-align: center;
    }

    .signature-line {
      margin-top: 18mm;
      border-top: 1px solid #000;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    .signature-label {
      margin-top: 3mm;
    }
    .my-table td {    
      padding: 0;
      margin-left: 2px;

      border: none;
      vertical-align: middle;
    }
    .sub-table td {
      padding: 3px 2px 0px 5px;  
      border: 1px solid #000;
    }
    .gray {
      background-color: #cecece;
      font-weight: bold;
    }
    .bold{
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- หน้า 1 -->
  <div class="page">
    <div class="report-header">ใช้ภายในกรมบัญชีกลางเท่านั้น</div>
    <table style="border: none;">
      <tr>
        <td style="width: 20mm; border: none;" rowspan="2"><img src="images/cgd.svg" alt="Logo" style="height: 60px;"></td>
        <td style="width: 30mm; border: none; text-align: right;">หมายเลขเอกสาร :</td>        
        
        <td style="border: none;">FM-ISWT-010 </td>
        <td style="width: 20mm;border: none;">เวอร์ชัน :  7.0 </td>
      </tr>
      <tr>       
        <td style="text-align: right;border: none;">ชื่อเอกสาร :</td>
        <td colspan="2" style="border: none;">แบบฟอร์มการร้องขอการเปลี่ยนแปลงหรือแก้ไขระบบ (Request for Change) </td>
      </tr>
    </table>
    <hr style="border: 0.1px solid #000; width: 100%; margin-top: 10px; margin-bottom: 15px;" />
    <div class="report-title">แบบบันทึกการร้องขอการเปลี่ยนแปลงหรือแก้ไขระบบ (Request for Change)</div>
    
    <table class="my-table" style="width: 100%; border: none;">
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:100px;" class="gray">วันที่ขอดำเนินการ</td>
              <td style="text-align:left; width:250px;"></td>
              <td style="text-align:left; width:100px;" class="gray">เลขที่ใบคำขอ</td>
              <td style="text-align:left;"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td class="gray">ส่วนที่ 1 สำหรับผู้ร้องขอการเปลี่ยนแปลงหรือแก้ไขระบบ</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px;" class="gray">ชื่อ-นามสกุล</td>
              <td style="text-align:left; width:220px;">${data.meta.username}</td>
              <td style="text-align:left; width:55px;" class="gray">หน่วยงาน</td>
              <td style="text-align:left; width:170px;"></td>
              <td style="text-align:left; width:25px;" class="gray">โทร.</td>
              <td></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td class="gray">รายละเอียดของการเปลี่ยนแปลงหรือแก้ไขระบบ</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px;" class="bold">เรื่อง</td>
              <td style="text-align:left;"></td>              
            </tr>
          </table>
        </td>
      </tr>
       <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td rowspan="4" style="text-align:left; width:90px; vertical-align: top;" class="bold">รายละเอียด</td>
              <td style="text-align:left;">&nbsp</td>              
            </tr>
            <tr>
              <td>&nbsp</td>
            </tr>
             <tr>
              <td>&nbsp</td>
            </tr>
             <tr>
              <td>&nbsp</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td rowspan="2" style="text-align:left; width:90px; vertical-align: top;" class="bold">เหตุผล</td>
              <td style="text-align:left;">&nbsp</td>              
            </tr>
            <tr>
              <td>&nbsp</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px; vertical-align: top;" class="bold">เอกสารประกอบ <br>(ถ้ามี)</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px; vertical-align: top;" class="bold">ผู้เกี่ยวข้อง</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <!-- ------------------------ ส่วนที่ 2 สำหรับประเมินผล ---------------- -->
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td class="gray">ส่วนที่ 2 สำหรับประเมินผลกระทบ</td>
            </tr>
          </table>
        </td>
      </tr> 
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px; vertical-align: top;" class="bold">ประเภท</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px; vertical-align: top;" class="bold">ระบบที่เกี่ยวข้อง</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:150px; vertical-align: top;" class="bold">สภาพแวดล้อมที่มีผลกระทบ</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px; vertical-align: top;" class="bold">ส่งผลกระทบ<br>ต่อระบบ</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:90px; vertical-align: top;" class="bold">ระดับผลระบบ</td>
              <td style="text-align:left; vertical-align: top;"></td>              
            </tr>            
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align:left; width:80px; vertical-align: top;" class="bold">ช่วงวันที่ดำเนินการ</td>
              <td style="text-align:left; width:100px;"></td>    
              <td style="text-align:center; width:20px;" class="bold">ถึง</td>
              <td style="text-align:left; width:100px;"></td>
              <td style="text-align:center; width:20px; vertical-align: top;" class="bold">เวลา</td>
              <td style="text-align:left; width:60px;"></td>    
              <td style="text-align:center; width:20px;" class="bold">ถึง</td>
              <td style="text-align:left; width:60px;"></td>          
            </tr>            
          </table>
        </td>
      </tr>
      <!-- ------------------------ ลงนามเจ้าหน้าที่ ---------------- -->
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td class="gray">ลงนามเจ้าหน้าที่</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table class="sub-table" style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 50%;">
                <div>ผู้ร้องขอการเปลี่ยนแปลงแก้ไขระบบ</div>
                <div>ลงชื่อ .........................................................</div>
                <div>(.............................................................)</div>
                <div>ตำแหน่ง.........................................................</div>
                <div> 21 / พฤศจิกายน / 2568</div>
              </td>
              <td style="text-align: center; width: 50%;">
                <div>หัวหน้า / ผู้ได้รับมอบหมาย</div>
                 <div>ลงชื่อ .........................................................</div>
                <div>(.............................................................)</div>
                <div>ตำแหน่ง.........................................................</div>
                <div> 21 / พฤศจิกายน / 2568</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    

    
  </div>

  <!------------------------------- หน้า 2 --------------------------------->
  <div class="page page-break">
    <div class="report-header">ใช้ภายในกรมบัญชีกลางเท่านั้น</div>
    <table style="border: none;">
      <tr>
        <td style="width: 20mm; border: none;" rowspan="2"><img src="images/cgd.svg" alt="Logo" style="height: 60px;"></td>
        <td style="width: 30mm; border: none; text-align: right;">หมายเลขเอกสาร :</td>        
        
        <td style="border: none;">FM-ISWT-010 </td>
        <td style="width: 20mm;border: none;">เวอร์ชัน :  7.0 </td>
      </tr>
      <tr>       
        <td style="text-align: right;border: none;">ชื่อเอกสาร :</td>
        <td colspan="2" style="border: none;">แบบฟอร์มการร้องขอการเปลี่ยนแปลงหรือแก้ไขระบบ (Request for Change) </td>
      </tr>
    </table>
    <hr style="border: 0.1px solid #000; width: 100%; margin-top: 10px; margin-bottom: 15px;" />
    
    <table class="sub-table" style="width: 100%; ">
      <tr>
        <td colspan="2" class="gray">ส่วนที่ 3</td>
      </tr>
      <tr>        
        <td style="text-align:left; width:52%;" class="gray">สำหรับผู้ตรวจสอบการขอเปลี่ยนแปลงหรือแก้ไข<br>(กลุ่มงานรักษาความปลอดภัยด้านสารสนเทศ)</td>
        <td style="text-align:left; width:48%;" class="gray">สำหรับผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร<br>หรือผู้ที่ได้รับมอบหมาย</td>
      </tr>
      <tr>
        <td>
          ผลการพิจารณา<br>
          <div>
            <input type="radio" name="gender" value="male"> รับทราบการขอเปลี่ยนแปลงหรือแก้ไขระบบ
          </div>
          <div>
            <input type="radio" name="gender" value="female"> แจ้งต่อผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร

          </div>
          รายละเอียด<br>
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 25px 3px 3px 5px;
          ">
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 25px 3px 5px 3px;
          ">
        </td>
        <td>
          ผลการพิจารณา<br>
          <div>
            <input type="radio" name="gender" value="male"> อนุมัติ
          </div>
          <div>
            <input type="radio" name="gender" value="female"> ไม่อนุมัติ
          </div>
          เพราะ<br>
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 25px 3px 5px 3px;
          ">
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 25px 3px 5px 3px;
          ">
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <div>ผู้ตรวจสอบ</div>
          <div>ลงชื่อ .........................................................</div>
          <div>(.............................................................)</div>
          <div>ตำแหน่ง.........................................................</div>
          <div> 21 / พฤศจิกายน / 2568</div>
        </td>
        <td style="text-align: center;">
          <div>ผู้อนุมัติ</div>
            <div>ลงชื่อ .........................................................</div>
          <div>(.............................................................)</div>
          <div>ตำแหน่ง.........................................................</div>
          <div> 21 / พฤศจิกายน / 2568</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="gray">ส่วนที่ 4 สำหรับผู้ควบคุมการดำเนินการเปลี่ยนแปลงแก้ไข</td>
      </tr>
      <tr>
        <td style="text-align: left;">
          <div>ผลการดำเนินการ</div>
          <input type="radio" name="gender" value="male"> ดำเนินการแล้ว วันที่<br>
          ผู้ดำเนินการ          
          <br><input type="radio" name="gender" value="male"> ไม่สามารถดำเนินการได้<br>
          รายละเอียด<br>
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 20px 3px 5px 3px;
          ">
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 20px 3px 5px 3px;
          ">
        </td>
        <td style="text-align: center; vertical-align: middle;">
          <div>ผู้ควบคุมการดาเนินการ</div>
            <div>ลงชื่อ .........................................................</div>
          <div>(.............................................................)</div>
          <div>ตำแหน่ง.........................................................</div>
          <div> 21 / พฤศจิกายน / 2568</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="gray">ส่วนที่ 5 สำหรับติดตาม / ตรวจสอบผลการเปลี่ยนแปลงหรือแก้ไข</td>
      </tr>
      <tr>
        <td>
          การติดตามผลการเปลี่ยนแปลงหรือแก้ไข<br>
          <div>
            <input type="radio" name="gender" value="male"> ดำเนินการสำเร็จ
            <input type="radio" name="gender" value="female"> ดำเนินการไม่สำเร็จ

          </div>
          รายละเอียด<br>
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 20px 3px 3px 5px;
          ">          
        </td>
        <td>
          การตรวจสอบผลการเปลี่ยนแปลงหรือแก้ไข<br>
          <div>
            <input type="radio" name="gender" value="male"> ดำเนินการตรวจสอบแล้ว
            <input type="radio" name="gender" value="female"> ไม่สามารถตรวจสอบได้
          </div>
          รายละเอียด<br>
          
          <hr style="
            border: 0;
            border-top: 1px solid #000;
            transform: scaleY(0.5);
            transform-origin: top;
            margin: 20px 3px 5px 3px;
          ">
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <div>ผู้ร้องขอ/ติดตาม</div>
          <div>ลงชื่อ .........................................................</div>
          <div>(.............................................................)</div>
          <div>ตำแหน่ง.........................................................</div>
          <div> 21 / พฤศจิกายน / 2568</div>
        </td>
        <td style="text-align: center;">
          <div>ผู้ตรวจสอบ</div>
            <div>ลงชื่อ .........................................................</div>
          <div>(.............................................................)</div>
          <div>ตำแหน่ง.........................................................</div>
          <div> 21 / พฤศจิกายน / 2568</div>
        </td>
      </tr>
    </table>    
  </div>
</body>
</html>`
}
