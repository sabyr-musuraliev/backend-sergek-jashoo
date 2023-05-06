const { Schema, model, Types } = require("mongoose");

const Patient = new Schema({
    name: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        middlename: { type: String },
    },
    dateBirth: { type: Date },
    sex: { type: String },
    address: { type: String },
    contacts: { type: String },
    status: { type: Boolean, default: true },
    education: { type: String },
    marriage: { type: String },
    job: { type: String },
    guilty: { type: String },
    allergy: { type: String },
    partDesease: { type: String },
});

module.exports = model("Patient", Patient);
