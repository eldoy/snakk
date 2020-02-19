"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var _ = require("lodash");
var flat = require("flat");
var args_1 = require("./args");
var tools_1 = require("./tools");
var name = args_1["default"].getName();
var from = args_1["default"].getFrom();
var to = args_1["default"].getTo();
var file = tools_1["default"].getFile(name);
var data = tools_1["default"].getData(file);
var exst;
if (tools_1["default"].exists(to)) {
    exst = tools_1["default"].getData(tools_1["default"].read(to));
}
var tree = flat.flatten(data);
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var result, _a, _b, _i, key, value, has, yml, _c, base, ext, out;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    result = {};
                    _a = [];
                    for (_b in tree)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    key = _a[_i];
                    value = tree[key];
                    has = _.get(exst, key);
                    if (!(typeof has !== 'string')) return [3 /*break*/, 3];
                    console.log('DOING IT', has);
                    return [4 /*yield*/, tools_1["default"].translate(value, from, to)];
                case 2:
                    value = _d.sent();
                    _d.label = 3;
                case 3:
                    _.set(result, key, has || value);
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    console.log(JSON.stringify(result, null, 2));
                    yml = tools_1["default"].getYAML(result);
                    _c = name.split('.'), base = _c[0], ext = _c[1];
                    out = to + "." + ext;
                    console.log("Writing file " + out);
                    if (!tools_1["default"].exists(out)) {
                        tools_1["default"].write(out, yml);
                    }
                    else {
                        console.log('Can not write to file, file already exists.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}());
