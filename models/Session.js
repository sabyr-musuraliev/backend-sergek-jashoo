const { Schema, model, Types } = require("mongoose");

const Session = new Schema({
    owner: { type: Types.ObjectId, ref: "Patient" },
    dateIn: { type: Date, default: Date.now },
    dateOut: { type: Date },
    incomeState: { type: String },
    escort: { type: String },
    escortWith: { type: String },
    complaints: { type: String },
    status: { type: Boolean, default: true },
    contacts: { type: String },
    anamnesisLife: {
        medicineTake: { type: String },
    },
    anamnesisDisease: {
        pavIntake: { type: String },
        abstinent: {
            somat: { type: String },
            psych: { type: String },
        },
        patalogic: {
            stream: { type: String },
            fight: { type: String },
        },
        control: { type: String },
        palimp: { type: String },
        amnesia: { type: String },
        typeAlco: { type: String },
        tolerant: { type: String },
        maxTolerant: { type: String },
        typeLiquid: { type: String },
        zapoi: { type: String },
        lightTimeline: { type: String },
        lastZapoi: { type: String },
        lastRemiss: { type: String },
        lastMedicine: { type: String },
        lastAlcoIncome: { type: String },
        doseAlco: { type: String },
        additionalInfo: { type: String },
    },
    somatStatus: {
        condition: { type: String },
        nutrition: { type: String },
        skin: {
            color: { type: String },
            humidity: { type: String },
        },
        scars: { type: String },
        eyeState: { type: String },
        breathe: { type: String },
        wheezing: { type: String },
        saturation: { type: String },
        tonesHeart: { type: String },
        antPressure: { type: String },
        pulse: { type: String },
        fill: { type: String },
        deficite: { type: String },
        tongue: { type: String },
        stomach: { type: String },
        liver: { type: String },
        vomit: { type: String },
        diarrhea: { type: String },
        diuresis: { type: String },
        edema: { type: String },
        glucose: { type: String },
        bonesLink: { type: String },
        periferState: { type: String },
        additionalInfo: { type: String },
    },
    nervStatus: {
        pupil: { type: String },
        photoReaction: { type: String },
        meningit: { type: String },
        coordinate: { type: String },
        romberg: { type: String },
        convulsions: { type: String },
        dysarthria: { type: String },
    },
    psychStatus: {
        look: { type: String },
        breathSmell: { type: String },
        behave: { type: String },
        consciousness: { type: String },
        orientation: { type: String },
        perception: { type: String },
        emotion: { type: String },
        sleep: { type: String },
        suicide: { type: String },
        motive: { type: String },
        goalMed: { type: String },
    },
});

module.exports = model("Session", Session);
