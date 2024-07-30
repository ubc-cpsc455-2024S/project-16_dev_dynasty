const Checklist = require("../models/Checklist");
// const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const templateList = require("../checklist_templates/template_list");

const getChecklistFromDb = async (houseId) => {
  return Checklist.findOne({
    house_id: houseId,
  });
};

const initializeChecklist = (houseId) => {
  return new Checklist({
    house_id: houseId,
  });
};

const deleteChecklistFromDb = async (houseId) => {
  const checklist = await Checklist.findOneAndDelete({
    house_id: houseId,
  });
  if (checklist) {
    return { success: true };
  } else {
    return { success: false };
  }
};

const createPdfChecklist = async (checklist, house, res) => {
  let doc = new PDFDocument({ autoFirstPage: false });
  doc.pipe(res);

  for (const template of templateList) {
    doc.addPage({
      margins: {
        top: 50,
        bottom: 50,
        left: 25,
        right: 25,
      },
    });

    const tableHeaders = [
      { label: "", property: "name", width: 130, renderer: null },
      {
        label: "Accept",
        property: "accept",
        width: 50,
        align: "center",
        renderer: null,
      },
      {
        label: "Deficient",
        property: "deficient",
        width: 50,
        align: "center",
        renderer: null,
      },
      {
        label: "Repaired By",
        property: "repaired_by",
        width: 50,
        align: "center",
        renderer: null,
      },
      {
        label: "QC Checked",
        property: "checked",
        width: 50,
        align: "center",
        renderer: null,
      },
      {
        label: "Remarks",
        property: "remarks",
        width: 232,
        align: "center",
        renderer: null,
      },
    ];

    const tableData = checklist[template.label].records.map((record) => {
      const name =
        record.level === "header"
          ? `bold:${record.name}`
          : "     " + `${record.name}`;
      const accept = record.fillable ? (record.accept ? "X" : "") : "*";
      const deficient = record.fillable ? (record.deficient ? "X" : "") : "*";
      const repaired_by = record.fillable ? record.repaired_by : "*";
      const checked = record.fillable ? (record.checked ? "X" : "") : "*";
      const remarks = record.remarks;

      return {
        name: name,
        accept: accept,
        deficient: deficient,
        repaired_by: repaired_by,
        checked: checked,
        remarks: remarks,
      };
    });

    // table
    const table = {
      title: `NPL#: ${house.npl}`,
      subtitle: `${template.name}`,
      headers: tableHeaders,
      datas: tableData,
      rows: [],
    };

    const options = {};

    await doc.table(table, options);
  }
  doc.end();
};

module.exports = {
  initializeChecklist,
  getChecklistFromDb,
  deleteChecklistFromDb,
  createPdfChecklist,
};

// requires
