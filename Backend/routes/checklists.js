var express = require("express");
var router = express.Router();
const {
  getChecklistFromDb,
  getHouseFromDb,
  initializeChecklist,
} = require("../services/checklistServices");

// GET endpoint to retrieve checklist by house id and checklist name
router.get("/:houseId/:checklistName", async (req, res) => {
  const houseId = req.params.houseId;
  const checklistName = req.params.checklistName;
  try {
    const house = await getHouseFromDb(houseId);
    if (!house) {
      res.status(404).send("Invalid house id");
    } else {
      let checklist = await getChecklistFromDb(houseId, checklistName);
      if (!checklist) {
        checklist = initializeChecklist(houseId, checklistName);
        await checklist.save();
      }
      res.status(200).json({ result: checklist });
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
