/**
 * Build CSV string from rows and trigger browser download.
 * @param {string} filename
 * @param {string[]} headers
 * @param {Object[]} rows
 * @param {string[]} columns
 */
export function downloadCsv(filename, headers, rows, columns) {
  const escape = (val) => {
    const s = val == null ? "" : String(val);
    if (/[",\n\r]/.test(s)) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const lines = [headers.map(escape).join(",")];
  for (const row of rows) {
    lines.push(columns.map((col) => escape(row[col])).join(","));
  }

  const blob = new Blob([lines.join("\n") + "\n"], {
    type: "text/csv;charset=utf-8"
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

/**
 * Parse CSV text into array of row objects (first row = headers).
 * @param {string} text
 * @returns {Object[]}
 */
export function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];

  const parseLine = (line) => {
    const fields = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        fields.push(current);
        current = "";
        continue;
      }
      current += ch;
    }
    fields.push(current);
    return fields;
  };

  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] != null ? values[i] : "";
    });
    return row;
  });
}
