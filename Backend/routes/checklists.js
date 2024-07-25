var express = require("express");
var router = express.Router();
const {
  getChecklistFromDb,
  initializeChecklist,
} = require("../services/checklistServices");

// PUT endpoint to add/replace checklist by house id
router.put("/:houseId", async (req, res) => {
  const houseId = req.params.houseId;
  try {
    let checklist = await getChecklistFromDb(houseId);
    if (checklist) {
      checklist.overwrite(req.body);
      await checklist.save();
      res.status(200).json({ result: checklist });
    } else {
      checklist = initializeChecklist(houseId);
      await checklist.save();
      res.status(201).json({ result: checklist });
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// GET endpoint to retrieve checklist by house id
router.get("/:houseId", async (req, res) => {
  const houseId = req.params.houseId;
  try {
    const checklist = await getChecklistFromDb(houseId);
    if (checklist) {
      res.status(200).json({ result: checklist });
    } else {
      res.status(404).send("Checklist not found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
