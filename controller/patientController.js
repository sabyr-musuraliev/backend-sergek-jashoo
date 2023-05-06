const Patient = require("../models/Patient");
const Session = require("../models/Session");

class patientController {
    async create(req, res) {
        try {
            const { patientName, patient } = req.body;

            console.log(patient.status);

            const newPatient = new Patient({
                name: {
                    firstname: patientName.firstname,
                    lastname: patientName.lastname,
                    middlename: patientName.middlename,
                },
                dateBirth: patient.dateBirth,
                sex: patient.sex,
                address: patient.address,
                contacts: patient.contacts,
                status: patient.status,
                education: patient.education,
                marriage: patient.marriage,
                job: patient.job,
                guilty: patient.guilty,
                allergy: patient.allergy,
                partDesease: patient.partDesease,
            });
            await newPatient.save();
            res.json({ statusLoading: false });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Ошибка регистрации пользователя",
            });
        }
    }

    async createSession(req, res) {
        try {
            const {
                anamnesisDisease,
                somatStatus,
                nervStatus,
                psychStatus,
                formData,
                idName,
            } = req.body;

            const user = await Patient.findById(idName);

            user.status = true;

            await user.save();

            let utc = new Date();
            utc.setHours(utc.getHours() + 6);

            const newSession = await new Session({
                owner: idName,
                dateIn: utc,
                incomeState: formData.incomeState,
                escort: formData.escort,
                escortWith: formData.escortWith,
                complaints: formData.complaints,
                contacts: formData.contacts,
                anamnesisLife: {
                    medicineTake: anamnesisDisease.medicineTake,
                },
                anamnesisDisease: {
                    pavIntake: `${anamnesisDisease.pavIntake} ${anamnesisDisease.pavIntakeSign}`,
                    abstinent: {
                        somat: anamnesisDisease.abstinentSomat,
                        psych: anamnesisDisease.abstinentPsych,
                    },
                    patalogic: {
                        stream: anamnesisDisease.patalogicStream,
                        fight: anamnesisDisease.patalogicFight,
                    },
                    control: anamnesisDisease.control,
                    palimp: anamnesisDisease.palimp,
                    amnesia: anamnesisDisease.amnesia,
                    typeAlco: anamnesisDisease.typeAlco,
                    tolerant: anamnesisDisease.tolerant,
                    maxTolerant: `${anamnesisDisease.maxTolerant} ${anamnesisDisease.maxTolerantSign}`,
                    typeLiquid: anamnesisDisease.typeLiquid,
                    zapoi: `${anamnesisDisease.zapoi} ${anamnesisDisease.zapoiSign}`,
                    lightTimeline: `${anamnesisDisease.lightTimeline} ${anamnesisDisease.lightTimelineSign}`,
                    lastZapoi: `${anamnesisDisease.lastZapoi} ${anamnesisDisease.lastZapoiSign}`,
                    lastRemiss: `${anamnesisDisease.lastRemiss} ${anamnesisDisease.lastRemissSign}`,
                    lastMedicine: anamnesisDisease.lastMedicine,
                    lastAlcoIncome: anamnesisDisease.lastAlcoIncome,
                    doseAlco: `${anamnesisDisease.doseAlco} ${anamnesisDisease.doseAlcoSign}`,
                    additionalInfo: anamnesisDisease.additionalInfo,
                },
                somatStatus: {
                    condition: somatStatus.condition,
                    nutrition: somatStatus.nutrition,
                    skin: {
                        color: somatStatus.skinColor,
                        humidity: somatStatus.skinHumidity,
                    },
                    scars: somatStatus.scars,
                    eyeState: somatStatus.eyeState,
                    breathe: somatStatus.breathe,
                    wheezing: somatStatus.wheezing,
                    saturation: `${somatStatus.saturation} %`,
                    tonesHeart: somatStatus.tonesHeart,
                    antPressure: `${somatStatus.antPressure1} / ${somatStatus.antPressure2}`,
                    pulse: somatStatus.pulse,
                    fill: somatStatus.fill,
                    deficite: somatStatus.deficite,
                    tongue: somatStatus.tongue,
                    stomach: somatStatus.stomach,
                    liver: somatStatus.liver,
                    vomit: somatStatus.vomit,
                    diarrhea: somatStatus.diarrhea,
                    diuresis: somatStatus.diuresis,
                    edema: somatStatus.edema,
                    glucose: somatStatus.glucose,
                    bonesLink: somatStatus.bonesLink,
                    periferState: somatStatus.periferState,
                    additionalInfo: somatStatus.additionalInfo,
                },
                nervStatus: {
                    pupil: nervStatus.pupil,
                    photoReaction: nervStatus.photoReaction,
                    meningit: nervStatus.meningit,
                    coordinate: nervStatus.coordinate,
                    romberg: nervStatus.romberg,
                    convulsions: nervStatus.convulsions,
                    dysarthria: nervStatus.dysarthria,
                },
                psychStatus: {
                    look: psychStatus.look,
                    breathSmell: psychStatus.breathSmell,
                    behave: psychStatus.behave,
                    consciousness: psychStatus.consciousness,
                    orientation: psychStatus.orientation,
                    perception: psychStatus.perception,
                    emotion: psychStatus.emotion,
                    sleep: psychStatus.sleep,
                    suicide: psychStatus.suicide,
                    motive: psychStatus.motive,
                    goalMed: psychStatus.goalMed,
                },
            });
            await newSession.save();
            res.json({ statusLoading: false });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Ошибка регистрации сессии",
            });
        }
    }

    async getAllPatient(req, res) {
        try {
            let { page, size } = req.query;

            if (page === 0 || page === "0") {
                page = 1;
            }

            const limit = size ? parseInt(size) : 10;
            const skip = page ? (parseInt(page) - 1) * limit : 0;

            const patients = await Patient.find({ status: true })
                .skip(skip)
                .limit(limit);

            const total = await Patient.countDocuments({ status: true });

            res.json({
                patients,
                totalPages: Math.ceil(total / limit),
                currentPage: parseInt(page),
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Ошибка вывода пользователей" });
        }
    }

    async getOnePatient(req, res) {
        try {
            const patientId = req.params.id;
            const patient = await Patient.findOne({ _id: patientId });
            const sessions = await Session.find({ owner: patientId }).sort({
                dateIn: -1,
            });

            const results = { patientInfo: patient, sessionsInfo: sessions };

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Ошибка вывода одного пользователя",
            });
        }
    }

    async getOneSession(req, res) {
        try {
            const sessionId = req.params.id;
            const session = await Session.findOne({ _id: sessionId });

            const results = { sessionsInfo: session };

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка вывода сессии" });
        }
    }

    async deactivateSession(req, res) {
        try {
            const sessionId = req.params.id;
            let utc = new Date();
            utc.setHours(utc.getHours() + 6);
            const session = await Session.findByIdAndUpdate(
                sessionId,
                { status: false, dateOut: utc },
                { new: true }
            );
            const patient = await Patient.findByIdAndUpdate(
                session.owner,
                { status: false },
                { new: true }
            );

            const results = { patientInfo: patient, sessionsInfo: session };

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Не получилось деактивировать сессию",
            });
        }
    }

    async searchPatient(req, res) {
        const { searchName, page, size } = req.query;

        const limit = size ? parseInt(size) : 10;
        const skip = page ? (parseInt(page) - 1) * limit : 0;

        let query = {};

        if (searchName && searchName.trim() !== "") {
            query = {
                $or: [
                    { "name.firstname": { $regex: searchName, $options: "i" } },
                    { "name.lastname": { $regex: searchName, $options: "i" } },
                ],
            };
        }

        try {
            const count = await Patient.countDocuments(query);
            const patients = await Patient.find(query).skip(skip).limit(limit);

            res.json({
                patients,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async newOneSession(req, res) {
        try {
            const patientId = req.params.id;
            const patient = await Patient.findOne({ _id: patientId });

            const results = { patientInfo: patient };

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Ошибка вывода сессии" });
        }
    }

    async deletePatient(req, res) {
        try {
            const patientId = req.params.id;
            await Session.deleteMany({ owner: patientId });
            const deletedPatient = await Patient.findByIdAndDelete(patientId);

            if (!deletedPatient) {
                return res.status(404).json({ message: "Пациент не найден" });
            }

            res.status(200).json({ message: "Пациент успешно удален" });
        } catch (error) {
            res.status(500).json({
                message: "Ошибка при удалении пациента",
                error: error,
            });
        }
    }

    async getPatientUpdate(req, res) {
        try {
            const patientId = req.params.id;
            const patient = await Patient.findById(patientId);

            if (!patient) {
                return res.status(404).json({ message: "Такого пациента нет" });
            }

            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({
                message: "Ошибка при выводе информации о пациенте",
                error: error,
            });
        }
    }

    async updatePatientById(req, res) {
        try {
            const { patientName, patient } = req.body;

            const updatedPatient = await Patient.findById(req.params.id);
            if (!updatedPatient) {
                return res.status(404).json({ message: "Пациент не найден" });
            }

            updatedPatient.name.firstname = patientName.firstname;
            updatedPatient.name.lastname = patientName.lastname;
            updatedPatient.name.middlename = patientName.middlename;
            updatedPatient.dateBirth = patient.dateBirth;
            updatedPatient.address = patient.address;
            updatedPatient.contacts = patient.contacts;
            updatedPatient.sex = patient.sex;
            updatedPatient.education = patient.education;
            updatedPatient.marriage = patient.marriage;
            updatedPatient.job = patient.job;
            updatedPatient.guilty = patient.guilty;
            updatedPatient.allergy = patient.allergy;
            updatedPatient.partDesease = patient.partDesease;
            await updatedPatient.save();

            res.json({
                message: "Данные пациента успешно обновлены",
                updatedPatient,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async updateSessionById(req, res) {
        try {
            const {
                anamnesisDisease,
                somatStatus,
                nervStatus,
                psychStatus,
                formData,
            } = req.body;

            const updatedSession = await Session.findById(req.params.id);
            if (!updatedSession) {
                return res.status(404).json({ message: "Пациент не найден" });
            }

            updatedSession.incomeState = formData.incomeState;
            updatedSession.escort = formData.escort;
            updatedSession.escortWith = formData.escortWith;
            updatedSession.complaints = formData.complaints;
            updatedSession.contacts = formData.contacts;
            updatedSession.anamnesisLife.medicineTake =
                anamnesisDisease.medicineTake;

            updatedSession.anamnesisDisease.pavIntake =
                anamnesisDisease.pavIntake;

            updatedSession.anamnesisDisease.abstinent.somat =
                anamnesisDisease.abstinentSomat;
            updatedSession.anamnesisDisease.abstinent.psych =
                anamnesisDisease.abstinentPsych;
            updatedSession.anamnesisDisease.patalogic.stream =
                anamnesisDisease.patalogicStream;
            updatedSession.anamnesisDisease.patalogic.fight =
                anamnesisDisease.patalogicFight;

            updatedSession.anamnesisDisease.control = anamnesisDisease.control;
            updatedSession.anamnesisDisease.palimp = anamnesisDisease.palimp;
            updatedSession.anamnesisDisease.amnesia = anamnesisDisease.amnesia;
            updatedSession.anamnesisDisease.typeAlco =
                anamnesisDisease.typeAlco;
            updatedSession.anamnesisDisease.tolerant =
                anamnesisDisease.tolerant;
            updatedSession.anamnesisDisease.maxTolerant =
                anamnesisDisease.maxTolerant;
            updatedSession.anamnesisDisease.typeLiquid =
                anamnesisDisease.typeLiquid;
            updatedSession.anamnesisDisease.zapoi = anamnesisDisease.zapoi;
            updatedSession.anamnesisDisease.lightTimeline =
                anamnesisDisease.lightTimeline;
            updatedSession.anamnesisDisease.lastZapoi =
                anamnesisDisease.lastZapoi;
            updatedSession.anamnesisDisease.lastRemiss =
                anamnesisDisease.lastRemiss;
            updatedSession.anamnesisDisease.lastMedicine =
                anamnesisDisease.lastMedicine;
            updatedSession.anamnesisDisease.lastAlcoIncome =
                anamnesisDisease.lastAlcoIncome;
            updatedSession.anamnesisDisease.doseAlco =
                anamnesisDisease.doseAlco;
            updatedSession.anamnesisDisease.additionalInfo =
                anamnesisDisease.additionalInfo;

            updatedSession.somatStatus.condition = somatStatus.condition;
            updatedSession.somatStatus.nutrition = somatStatus.nutrition;
            updatedSession.somatStatus.skin.color = somatStatus.skinColor;
            updatedSession.somatStatus.skin.humidity = somatStatus.skinHumidity;
            updatedSession.somatStatus.scars = somatStatus.scars;
            updatedSession.somatStatus.eyeState = somatStatus.eyeState;
            updatedSession.somatStatus.breathe = somatStatus.breathe;
            updatedSession.somatStatus.wheezing = somatStatus.wheezing;
            updatedSession.somatStatus.saturation = somatStatus.saturation;
            updatedSession.somatStatus.tonesHeart = somatStatus.tonesHeart;
            updatedSession.somatStatus.antPressure = `${somatStatus.antPressure1} / ${somatStatus.antPressure2}`;
            updatedSession.somatStatus.pulse = somatStatus.pulse;
            updatedSession.somatStatus.fill = somatStatus.fill;
            updatedSession.somatStatus.deficite = somatStatus.deficite;
            updatedSession.somatStatus.tongue = somatStatus.tongue;
            updatedSession.somatStatus.stomach = somatStatus.stomach;
            updatedSession.somatStatus.liver = somatStatus.liver;
            updatedSession.somatStatus.vomit = somatStatus.vomit;
            updatedSession.somatStatus.diarrhea = somatStatus.diarrhea;
            updatedSession.somatStatus.diuresis = somatStatus.diuresis;
            updatedSession.somatStatus.edema = somatStatus.edema;
            updatedSession.somatStatus.glucose = somatStatus.glucose;
            updatedSession.somatStatus.bonesLink = somatStatus.bonesLink;
            updatedSession.somatStatus.periferState = somatStatus.periferState;
            updatedSession.somatStatus.additionalInfo =
                somatStatus.additionalInfo;

            updatedSession.nervStatus.pupil = nervStatus.pupil;
            updatedSession.nervStatus.photoReaction = nervStatus.photoReaction;
            updatedSession.nervStatus.meningit = nervStatus.meningit;
            updatedSession.nervStatus.coordinate = nervStatus.coordinate;
            updatedSession.nervStatus.romberg = nervStatus.romberg;
            updatedSession.nervStatus.convulsions = nervStatus.convulsions;
            updatedSession.nervStatus.dysarthria = nervStatus.dysarthria;

            updatedSession.psychStatus.look = psychStatus.look;
            updatedSession.psychStatus.breathSmell = psychStatus.breathSmell;
            updatedSession.psychStatus.behave = psychStatus.behave;
            updatedSession.psychStatus.consciousness =
                psychStatus.consciousness;
            updatedSession.psychStatus.orientation = psychStatus.orientation;
            updatedSession.psychStatus.perception = psychStatus.perception;
            updatedSession.psychStatus.emotion = psychStatus.emotion;
            updatedSession.psychStatus.sleep = psychStatus.sleep;
            updatedSession.psychStatus.suicide = psychStatus.suicide;
            updatedSession.psychStatus.motive = psychStatus.motive;
            updatedSession.psychStatus.goalMed = psychStatus.goalMed;

            await updatedSession.save();

            res.json({
                message: "Данные сессии успешно обновлены",
                updatedSession,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async getSessionUpdate(req, res) {
        try {
            const sessionId = req.params.id;
            const session = await Session.findById(sessionId);

            if (!session) {
                return res.status(404).json({ message: "Такой сессии нет" });
            }

            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({
                message: "Ошибка при выводе информации о сессии",
                error: error,
            });
        }
    }
}

module.exports = new patientController();
