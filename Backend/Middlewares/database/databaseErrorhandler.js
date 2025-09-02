import asyncErrorWrapper from "express-async-handler";
import CustomError from "../../Helpers/Error/CustomError.js";
import Story from "../../models/story.js";


export const checkStoryExist = asyncErrorWrapper(async (req,res,next) => {
  
    const {slug} = req.params  ;
    const story = await Story.findOne({ slug: slug });

    if(!story) {
        return next(new CustomError("There is no such story with that slug ",400))
    }

    next() ; 

})


export const checkUserAndStoryExist = asyncErrorWrapper(async(req, res, next) => {

    const {slug} =req.params 

    const story = await Story.findOne({
        slug : slug ,
        author :req.user 
    })

    if (!story ) {
        return next(new CustomError("There is no story with that slug associated with User ",400))
    }

    next() ; 

})


