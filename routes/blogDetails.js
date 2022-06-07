const express = require("express");
const blogDetailsRouter = express.Router();
const listOfWorks = require("../models/listOfWorks");
const Comments = require("../models/comments");
const Replies = require("../models/reply");
const dateFormat = require("../dateFormat");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login"); 
}

blogDetailsRouter.route("/:id")
    .get(isLoggedIn, async (req, res) => {
        const id = req.params.id;
        
        await listOfWorks.findById(id)
        .then(async work => {
            await Comments.find({})
            .populate({ path: "replies", populate: { path: "posted"}})
            .populate("postedby")
            .then(comments => {
                res.render("blogDetails", { 
                    work: work,
                    certify: work.likes.length,
                    decertify: work.dislikes.length,
                    comments: comments
                })
            })
        })
        .catch( err => console.log(err));
    })

blogDetailsRouter.route("/comment/:id")
    .post(async (req, res) => {
        const id = req.params.id;
        const comment = {
            text: req.body.comment,
            postedby: req.user._id,
            date: `${dateFormat.dayOfMonth()} ${dateFormat.month()}, ${dateFormat.year()} ${dateFormat.time()}`
        }

        await Comments.find({})
        .then(async comments => {
            await listOfWorks.findById(id)
            .then(async work => {
                await Comments.create(comment)
                .then(comment => {
                    req.user.comments.push(comment._id);
                    work.comments.push(comment._id);
                    req.user.save();
                    work.save();
                    res.redirect(`/dashboard/${id}`)
                })
            })
        })
        .catch(err => console.log(err))
    });

blogDetailsRouter.route("/certify/:id")
    .post(async (req, res) => {
        const id = req.params.id;

        await listOfWorks.findById(id)
        .then(work => {

            if (work.dislikes.includes(req.user._id) && work.likes.includes(req.user._id)) {

                work.dislikes.pop(req.user._id);
                work.save();
                res.redirect(`/dashboard/${id}`);

            } else if (work.likes.includes(req.user._id)) {
      
                work.likes.pop(req.user._id);
                work.save();
                res.redirect(`/dashboard/${id}`);
      
            } else {
      
                work.dislikes.pop(req.user._id);
                work.likes.push(req.user._id);
                work.save();
                res.redirect(`/dashboard/${id}`);
            }
        })
        .catch(err => console.log(err));
    });

blogDetailsRouter.route("/decertify/:id")
    .post(async (req, res) => {
        const id = req.params.id;

        await listOfWorks.findById(id)
        .then(work => {

            if (work.dislikes.includes(req.user._id) && work.likes.includes(req.user._id)) {

                work.likes.pop(req.user._id);
                work.save();
                res.redirect(`/dashboard/${id}`);

            } else if (work.dislikes.includes(req.user._id)) {
      
                work.dislikes.pop(req.user._id);
                work.save();
                res.redirect(`/dashboard/${id}`);

            } else {
      
                work.likes.pop(req.user._id);
                work.dislikes.push(req.user._id);
                work.save();
                res.redirect(`/dashboard/${id}`);
            }
        })
        .catch(err => console.log(err));
    })

blogDetailsRouter.route("/:id/:id2")
    .post(async (req, res) => {
        const id = req.params;
        await listOfWorks.findById(id.id)
        .then(async work => {
            await Comments.findById(id.id2)
            .then(async comment => {
                Comments.find({})
                .then(comments => {

                    if (comment.likes.includes(req.user._id)) {
                        comment.likes.pop(req.user._id);
                        comment.save();
                        res.redirect(`/dashboard/${req.params.id}`);
                    } else {
                        comment.likes.push(req.user._id);
                        comment.save();
                        res.redirect(`/dashboard/${req.params.id}`);
                    }
                })
            })
        })
    });

blogDetailsRouter.route("/:id/:id2/reply")
    .post(async (req, res) => {
        const id = req.params;

        await listOfWorks.findById(id.id)
        .then(async work => {

            await Comments.findById(id.id2)
            .populate("postedby")
            .then(async comment => {
                const reply = {
                    text: req.body.reply,
                    posted: req.user._id,
                    date: `${dateFormat.dayOfMonth()} ${dateFormat.month()}, ${dateFormat.year()} ${dateFormat.time()}`
                }

                await Replies.create(reply)
                .then(reply => {
                    comment.replies.push(reply._id)
                    comment.save();
                    res.redirect(`/dashboard/${id.id}`)
                })
            })
        })
    })

blogDetailsRouter.route("/:id/:id2/reply/likes")
    .post(async (req, res) => {
        const id = req.params;

        await listOfWorks.findById(id.id)
        .then(async work => {

            await Replies.findById(id.id2)
            .then(async reply => {
                if (reply.likes.includes(req.user._id)) {
                    reply.likes.pop(req.user._id);
                    reply.save();
                    res.redirect(`/dashboard/${id.id}`);
                } else {
                    reply.likes.push(req.user._id);
                    reply.save();
                    res.redirect(`/dashboard/${id.id}`);
                }
            })
        })
    })


module.exports = blogDetailsRouter;