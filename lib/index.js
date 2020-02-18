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
var fs = require("fs");
var yaml = require("js-yaml");
var translate_1 = require("@google-cloud/translate");
var Translate = translate_1.v2.Translate;
var api = new Translate();
function usage(err) {
    console.log(err);
    console.log('\nUsage: snakk [filename] [from] [to]');
    console.log('\nExample: snakk file.yml en no');
    process.exit(1);
}
var name = process.argv[2];
if (!name) {
    usage('\nFile name not specified.');
}
console.log(name);
var from = process.argv[3];
if (!from) {
    usage('\nFrom language not specified.');
}
console.log(from);
var to = process.argv[4];
if (!to) {
    usage('\nFile name not specified.');
}
console.log(to);
var file;
try {
    file = fs.readFileSync(name, 'utf-8');
}
catch (e) {
    console.log('\nFile not found.');
    process.exit(1);
}
var data;
try {
    data = yaml.load(file);
}
catch (e) {
    console.log('\nCannot load YAML');
    process.exit(1);
}
console.log(data);
function write(obj) {
    var yml;
    try {
        yml = yaml.dump(obj);
    }
    catch (e) {
        console.log('\nCannot dump YAML');
        process.exit(1);
    }
    console.log(yml);
    var _a = name.split('.'), base = _a[0], ext = _a[1];
    fs.writeFileSync(base + "." + to + "." + ext, yml);
}
function run(obj) {
    return __awaiter(this, void 0, void 0, function () {
        function traverse(obj) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, key, result, translations, e_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = [];
                            for (_b in obj)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 7];
                            key = _a[_i];
                            if (!(obj[key] && typeof obj[key] === 'object')) return [3 /*break*/, 3];
                            return [4 /*yield*/, traverse(obj[key])];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 6];
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, api.translate(obj[key], { from: from, to: to })];
                        case 4:
                            result = (_c.sent())[0];
                            translations = Array.isArray(result) ? result : [result];
                            obj[key] = translations[0];
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _c.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, traverse(obj)];
                case 1:
                    _a.sent();
                    console.log('DONE');
                    console.log(JSON.stringify(obj));
                    write(obj);
                    return [2 /*return*/];
            }
        });
    });
}
run(data);
