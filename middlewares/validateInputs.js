//IMPORT MOODULES
const validator = require('validator');
const isEmpty = require('is-empty');

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * @desc validates user inputs. sends errors and stops current endpoint work if any
 */
exports.registerValidator = function (req,res,next){
  const errors = {};
  const data = req.body;

  
}