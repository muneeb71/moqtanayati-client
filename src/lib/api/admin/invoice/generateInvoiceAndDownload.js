import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateInvoiceAndDownload(invoiceData) {
  const { id, customerName, date, items } = invoiceData;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 780;
  const lineHeight = 20;

  const drawText = (text, x, y, size = 12, color = rgb(0, 0, 0)) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color,
    });
  };

  // Title
  drawText(`Invoice #${id}`, width / 2 - 50, y, 20);
  y -= lineHeight * 2;

  drawText(`Customer: ${customerName}`, 50, y);
  y -= lineHeight;
  drawText(`Date: ${date}`, 50, y);
  y -= lineHeight * 2;

  drawText("Items:", 50, y);
  y -= lineHeight;

  items.forEach((item) => {
    drawText(`${item.name} - ${item.qty} x $${item.price}`, 60, y);
    y -= lineHeight;
  });

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  y -= lineHeight;
  drawText(`Total: $${total}`, 50, y, 14, rgb(0, 0.4, 0));

  const pdfBytes = await pdfDoc.save();

  // Trigger download
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `invoice-${id}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
