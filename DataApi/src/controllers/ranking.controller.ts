import { RequestHandler } from "express";
import { Comparator } from '../Entities/Comparator.js'
import Database from "../utils/JsonDatabase.js";
import { Pontuation } from "../Entities/Pontuation.js";

const getRank: RequestHandler = async (req, res, next) => {
  try {
    const db = new Database<Pontuation[]>("../../json/Ranking.json")
    console.log()
    return res.status(200).json({data: db.get()})
  } catch (error: any) {
    return res.status(400).json({error: error.message})
  }
}

export {getRank}