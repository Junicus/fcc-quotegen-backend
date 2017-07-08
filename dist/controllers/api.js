"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fortunesData = require("../fortune.js");
const fortunesOffData = require("../fortune-off.js");
const fortuneMap = new Map();
const keys = ['reg', 'off'];
fortuneMap.set(keys[0], fortunesData);
fortuneMap.set(keys[1], fortunesOffData);
exports.getFortune = (req, res, next) => {
    let type = req.query.type;
    if (type === undefined && !(type === 'mix' || keys.find((elem) => { return elem == type; }) !== undefined))
        return next(`type query string missing or invalid: must be 'reg', 'off' or 'mix'`);
    if (type === 'mix') {
        var collectionIndex = Math.floor((Math.random() * keys.length));
        var quoteIndex = Math.floor((Math.random() * fortuneMap.get(keys[collectionIndex]).length) + 1);
        res.json({
            type: keys[collectionIndex],
            fortune: fortuneMap.get(keys[collectionIndex]).find((elem) => {
                return elem.quoteIndex === quoteIndex;
            })
        });
    }
    if (keys.find((coll) => {
        return coll == type;
    }) !== undefined) {
        var quoteIndex = Math.floor((Math.random() * fortuneMap.get(type).length) + 1);
        res.json({
            type: type,
            fortune: fortuneMap.get(type).find((elem) => {
                return elem.quoteIndex === quoteIndex;
            })
        });
    }
};
exports.getFortuneById = (req, res, next) => {
    let type = req.query.type;
    if (type === undefined && !(keys.find((elem) => { return elem === type; }) !== undefined))
        return next(`type query string missing or invalid: must be 'reg' or 'off'`);
    let quoteId = parseInt(req.params.id);
    res.json({
        type: type,
        fortune: fortuneMap.get(type).find((elem) => {
            return elem.quoteIndex === quoteId;
        })
    });
};
//# sourceMappingURL=api.js.map