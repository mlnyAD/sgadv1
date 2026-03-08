

import ExcelJS from "exceljs";

type ColumnDef = {
  key: string;
  header: string;
};

type BuildInput = {
  sheetName: string;
  columns: ColumnDef[];
  rows: Record<string, unknown>[];
};

export class XlsxBuilder {
  async build(input: BuildInput): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(input.sheetName);

    worksheet.columns = input.columns.map((col) => ({
      header: col.header,
      key: col.key,
      width: 20,
    }));

    for (const row of input.rows) {
      worksheet.addRow(row);
    }

    worksheet.getRow(1).font = { bold: true };

    worksheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    worksheet.columns.forEach((column) => {
      let maxLength = 10;

      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const length = cell.value ? cell.value.toString().length : 0;
        if (length > maxLength) {
          maxLength = length;
        }
      });

      column.width = Math.min(maxLength + 2, 40);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return Buffer.from(buffer);
  }
}