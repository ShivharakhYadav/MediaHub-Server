// const post = require('../../models/postSchema');
// const User = require('../../models/userSchema');
// const multer = require('multer');
// const multerStorage = require('../../helper/multerStorage');

// let updatedData;
// //Added watch on Post Database
// // const connection = post.watch();

// // connection.once("change", (changedData) => {
// //     console.log('changedData', changedData);
// //     switch (changedData.operationType) {
// //         case 'create': break;
// //         case 'insert':
// //             updatedData = changedData;
// //             break;
// //         case 'update': break;
// //         case 'delete': break;
// //     }
// // })

// //New Listener from changeStream
// post.watch().on('change', (changedData) => {
//     // console.log('data from changeStream', changedData)
//     switch (changedData.operationType) {
//         case 'create': break;
//         case 'insert':
//             console.log('-----Insert called-------')
//             updatedData = changedData;
//             break;
//         case 'update': break;
//         case 'delete': break;
//     }
// });

// const newPost = async (req, res) => {
//     try {
//         const { userid, postcount } = req.query;
//         if (!userid) { return res.status(404).send("Userid not found"); }

//         if (!postcount) { return res.status(404).send("postcount not found"); }

//         //Uploading Image
//         var upload = multer({ storage: multerStorage }).array('img', postcount);
//         upload(req, res, async function (err) {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             else {
//                 if (req.files.length > 0) {
//                     const { uploadTime } = req;

//                     if (!uploadTime) { return res.status(404).send("uploadTime not found"); }

//                     let postMediaArray = [];

//                     req?.files?.forEach((singleFile) => {
//                         const fileLink = `http://localhost:4100/images/${singleFile?.originalname}`;
//                         const postType = singleFile.mimetype.split('/')[0];

//                         if (singleFile?.originalname) {
//                             let obj = {
//                                 link: fileLink,
//                                 type: postType
//                             }
//                             postMediaArray.push(obj);
//                         }
//                     });

//                     //Created postBody for New post
//                     const postBody = {
//                         postid: uploadTime,
//                         userid: userid,
//                         uploadTime: uploadTime,
//                         postMedia: postMediaArray,
//                         like: 0,
//                     }

//                     let body = req.body;

//                     if ((Object.keys(body)).length > 0) {
//                         for (const [key, value] of Object.entries(body)) {
//                             postBody[key] = value
//                         }
//                     }

//                     //Saved to the database
//                     const uploadedPosts = await post.create(postBody);
//                     // console.log("post upladed")
//                     //socket Started
//                     const { socket, socketUser } = socketObject.ioObject;
//                     //console.log('before socket User', socketUser);

//                     setTimeout(async () => {
//                         console.log('--Asign changeData--------', updatedData);
//                         if (updatedData) {
//                             let userid = updatedData?.fullDocument?.userid;
//                             let { followers } = await User.findById({ _id: userid }).select("followers -_id");
//                             // console.log('allFollowers', allFollowers)

//                             let onlineAvilableFollowers = [];

//                             if (followers.length > 0 && followers) {
//                                 followers.map((follower) => {
//                                     let index = socketUser.findIndex(User => User.userid == follower);
//                                     if (index !== -1) {
//                                         onlineAvilableFollowers.push(socketUser[index]);
//                                     }
//                                 })
//                                 console.log('------onlineAvilableFollowers--------', onlineAvilableFollowers);

//                                 onlineAvilableFollowers.map((singleUser) => singleUser.socketid.map((id) => socket.to(id).emit("uploadedNewPost", uploadedPosts)))
//                             }


//                         }
//                     }, 1000)

//                     //Socket End

//                     return res.status(200).json({ success: true, data: uploadedPosts, message: "Post Uploaded SuccessFully" });
//                 }
//                 else {
//                     return res.status(200).send('File Not found');
//                 }
//             }
//         });



//     } catch (err) {
//         return res.status(500).send(err)
//     }
// }

// const comment = async (req, res) => {
//     try {
//         const body = { ...req.body, commentid: `${Date.now()}`, commentTime: `${Date.now()}` }
//         const addComment = await User.findOneAndUpdate({ _id: req.body.userid }, {
//             post: {
//                 $push: {
//                     comment: body
//                 }
//             }
//         }, { new: true });
//         const getUser = await User.find({ _id: req.body.userid });
//         res.status(200).send(getUser[0]);
//     }
//     catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// }

// const reply = async (req, res) => {
//     try {
//         //const findComment = post.
//     }
//     catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// }

// const getPostByIds = async (req, res) => {
//     try {
//         let data;
//         let sorted;
//         let ids = req.body.followings;
//         let unSorted = [];

//         if (!req.body.followings) {
//             return res.status(404).send('Following id not found')
//         }

//         data = await post.find({
//             'userid': {
//                 $in: ids
//             }
//         }).sort({ postid: -1 })

//         return res.status(200).json({ success: true, data: data, message: "" });
//     }
//     catch (err) {
//         return res.status(500).send('Server error')
//     }
// }
// module.exports = { newPost, comment, reply, getPostByIds }