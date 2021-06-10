"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingActionType = exports.OutgoingActionType = void 0;
var ensemblGenomeBrowser_1 = __importDefault(require("./ensemblGenomeBrowser"));
var action_1 = require("./action");
Object.defineProperty(exports, "OutgoingActionType", { enumerable: true, get: function () { return action_1.OutgoingActionType; } });
Object.defineProperty(exports, "IncomingActionType", { enumerable: true, get: function () { return action_1.IncomingActionType; } });
exports.default = ensemblGenomeBrowser_1.default;
