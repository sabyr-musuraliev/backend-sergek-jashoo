const { Router } = require("express");
const patientController = require("../controller/patientController");
const router = Router();

router.post("/create", patientController.create);
router.post("/createSession", patientController.createSession);
router.get("/", patientController.getAllPatient);
router.get("/searchTag", patientController.searchPatient);
router.get("/:id", patientController.getOnePatient);
router.get("/session/:id", patientController.getOneSession);
router.get("/newsession/:id", patientController.newOneSession);
router.patch("/session/:id", patientController.deactivateSession);
router.delete("/delete/:id", patientController.deletePatient);
router.get("/:id/edit", patientController.getPatientUpdate);
router.put("/:id/edit", patientController.updatePatientById);
router.get("/:id/session/edit", patientController.getSessionUpdate);
router.put("/:id/session/edit", patientController.updateSessionById);

module.exports = router;
