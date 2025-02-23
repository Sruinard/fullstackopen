"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = __importDefault(require("../services/patients"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send(patients_1.default.getPatients());
});
exports.default = router;
