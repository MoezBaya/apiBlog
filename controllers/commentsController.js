const asyncHandler = require("express-async-handler") ;
const { 
    Comment, 
    ValidateCreateComment,
    ValidateUpdateComment
} = require("../models/Comment");
const { User } = require("../models/User");

/**--------------------------------------------------------------------
 * @desc Create New Comment
 * @router /api/comments
 * @method POST
 * @access private (Only logged in user)
----------------------------------------------------------------------*/
module.exports.createCommentCtrl = asyncHandler(async (req,res)=>{
    const { error } = ValidateCreateComment(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const Profile = await User.findById(req.user.id);

    const comment = await Comment.create({
            
                postId: req.body.postId,
                text: req.body.text,
                user: req.user.id,
                username: Profile.username,
        
    });

    res.status(201).json(comment);
})

/**--------------------------------------------------------------------
 * @desc Get All Comments
 * @router /api/comments
 * @method GET
 * @access private (Only Admin)
----------------------------------------------------------------------*/
module.exports.getAllCommentCtrl = asyncHandler(async (req,res)=>{
    const comments = await Comment.find().populate("user");
    res.status(200).json(comments);
})

/**--------------------------------------------------------------------
 * @desc Delete Comment
 * @router /api/comments/:id
 * @method DELETE
 * @access private (Only Admin or owner of the comment)
----------------------------------------------------------------------*/
module.exports.deleteCommentCtrl = asyncHandler(async (req,res)=>{
    const comment = await Comment.findById(req.params.id);
    if(!comment) {
        return res.status(404).json({ message: "comment not found"});
    }

    if(req.user.isAdmin || req.user.id === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "comment has been deleted"})
    } else {
        res.status(403).json({ message: "access denied, not allowed" }) 
    }
});

/**--------------------------------------------------------------------
 * @desc Update Comment
 * @router /api/comments/:id
 * @method PUT
 * @access private (Only owner Comment)
----------------------------------------------------------------------*/
module.exports.updateCommentCtrl = asyncHandler(async (req,res)=>{
    const { error } = ValidateUpdateComment(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    
    const comment = await Comment.findById(req.params.id);
    if(!comment) {
        return res.status(404).json({ message: "comment not found" }); 
    }
 
    if(req.user.id !== comment.user.toString()) {
        return res.status(403).json({ message: 'access denied, youare not allowed' })
    }

    const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text,
        }
    }, {new : true }).populate("user", ["-password"]);

    res.status(200).json(updateComment);
})







