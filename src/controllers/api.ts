import { Response, Request, NextFunction } from 'express';
import * as fortunesData from '../fortune.js';
import * as fortunesOffData from '../fortune-off.js';

interface IFortune {
    quoteIndex: number;
    quoteLines: string[];
}

const fortuneMap: Map<string, IFortune[]> = new Map<string, IFortune[]>();
const keys: string[] = ['reg', 'off'];
fortuneMap.set(keys[0], fortunesData);
fortuneMap.set(keys[1], fortunesOffData);

export let getFortune = (req: Request, res: Response, next: NextFunction) => {
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
}

export let getFortuneById = (req: Request, res: Response, next: NextFunction) => {
    let type = req.query.type;
    if (type === undefined && !(keys.find((elem) => { return elem === type; }) !== undefined))
        return next(`type query string missing or invalid: must be 'reg' or 'off'`);
    let quoteId = parseInt(req.params.id);
    res.json({
        type: type,
        fortune: fortuneMap.get(type).find((elem)=> {
            return elem.quoteIndex === quoteId;
        })
    });
}