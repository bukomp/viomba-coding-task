"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const getLinks = (article, depth, limit, indentation = '', visited = new Set()) => __awaiter(void 0, void 0, void 0, function* () {
    if (depth < 0)
        return;
    else if (depth === 0) {
        console.log(`${indentation}${article}`);
        return;
    }
    visited.add(article);
    const { data } = yield axios_1.default.get(`https://en.wikipedia.org/wiki/${article}`);
    const $ = cheerio.load(data);
    const links = [];
    $('#mw-content-text p').first().prevAll('div[role="note"]').remove();
    $('#mw-content-text a').each((index, element) => {
        const link = $(element).attr('href');
        if (link &&
            link.startsWith('/wiki/') &&
            !link.includes(':') &&
            links.length < limit &&
            !visited.has(decodeURIComponent(link.slice(6)))) {
            const decodedLink = decodeURIComponent(link.slice(6));
            links.push(decodedLink);
        }
    });
    console.log(`${indentation}${article}`);
    for (const link of links) {
        if (!visited.has(link)) {
            yield getLinks(link, depth - 1, limit, `${indentation}  `, new Set(visited));
        }
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const article = process.argv[2];
    const depth = parseInt(process.argv[3]);
    const limit = parseInt(process.argv[4]);
    if (!article || isNaN(depth) || isNaN(limit)) {
        console.log('Usage: node src/index.ts [article] [depth] [limit]');
        process.exit(1);
    }
    yield getLinks(article, depth, limit);
});
main().catch(console.error);
