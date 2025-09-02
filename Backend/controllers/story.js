import asyncErrorWrapper from "express-async-handler";
import Story from "../models/story.js";
import cloudinary from "../Helpers/Libraries/cloudinary.js"; // add this at top
import {deleteCloudinaryImage }from "../Helpers/Libraries/deleteCloudinaryImage.js";
import { searchHelper, paginateHelper } from "../Helpers/query/queryHelpers.js";

export const addStory = asyncErrorWrapper(async  (req,res,next)=> {

    const {title,content} = req.body 

    var wordCount = content.trim().split(/\s+/).length ; 
   
    let readtime = Math.floor(wordCount /200)   ;


    try {
       if (!req.file) return res.status(400).json({ success: false, error: "Image is required" });

    // Upload image dynamically
    const uploadToCloudinary = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "stories" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(fileBuffer);
      });

    const result = await uploadToCloudinary(req.file.buffer);

    const newStory = await Story.create({
      title: req.body.title,
      content: req.body.content,
      image: result.secure_url, // dynamic Cloudinary URL
      author: req.user.id,
      readtime
    });

        return res.status(200).json({
            success :true ,
            message : "add story successfully ",
            data: newStory
        })
    }

    catch(error) {

        if (result?.secure_url) await deleteCloudinaryImage(result.secure_url);
    return next(error);
        
    }
  
})

export const getAllStories = asyncErrorWrapper( async (req,res,next) =>{

    let query = Story.find();

    query =searchHelper("title",query,req)

    const paginationResult =await paginateHelper(Story , query ,req)

    query = paginationResult.query  ;

    query = query.sort("-likeCount -commentCount -createdAt")

    const stories = await query
    
    return res.status(200).json(
        {
            success:true,
            count : stories.length,
            data : stories ,
            page : paginationResult.page ,
            pages : paginationResult.pages
        })

})

export const detailStory =asyncErrorWrapper(async(req,res,next)=>{

    const {slug}=req.params ;
    const {activeUser} =req.body 

    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")

    const storyLikeUserIds = story.likes.map(json => json.id)
    const likeStatus = storyLikeUserIds.includes(activeUser._id)


    return res.status(200).
        json({
            success:true,
            data : story,
            likeStatus:likeStatus
        })

})

export const likeStory =asyncErrorWrapper(async(req,res,next)=>{

    const {activeUser} =req.body 
    const {slug} = req.params ;

    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")
   
    const storyLikeUserIds = story.likes.map(json => json._id.toString())
   
    if (! storyLikeUserIds.includes(activeUser._id)){

        story.likes.push(activeUser)
        story.likeCount = story.likes.length
        await story.save() ; 
    }
    else {

        const index = storyLikeUserIds.indexOf(activeUser._id)
        story.likes.splice(index,1)
        story.likeCount = story.likes.length

        await story.save() ; 
    }
 
    return res.status(200).
    json({
        success:true,
        data : story
    })

})

export const editStoryPage  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
   
    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")

    return res.status(200).
        json({
            success:true,
            data : story
    })

})


export const editStory  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
    const {title ,content ,image ,previousImage } = req.body;

    const story = await Story.findOne({slug : slug })

    story.title = title ;
    story.content = content ;
     // If new image uploaded, delete old and upload new
     if (req.file) {
  await deleteCloudinaryImage(story.image);
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "stories" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(req.file.buffer);
  });
  story.image = uploadResult.secure_url;
}


    await story.save()  ;

    return res.status(200).
        json({
            success:true,
            data :story
    })

})

export const deleteStory  =asyncErrorWrapper(async(req,res,next)=>{

    const {slug} = req.params  ;

    const story = await Story.findOne({slug : slug })
    
   if (!story) return res.status(404).json({ success: false, error: "Story not found" });

    await deleteCloudinaryImage(story.image); // dynamic delete
   await story.deleteOne(); // ✅ new recommended method
res.json({ success: true });
    return res.status(200).
        json({
            success:true,
            message : "Story delete succesfully "
    })

})


