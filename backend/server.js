let express=require('express');
let app= express();
let mongoose=require('mongoose');
const cors = require('cors');
const { log } = require('console');
app.use(cors());
app.use(express.json());
const { YoutubeTranscript } = require('youtube-transcript');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

const messageSchema = new mongoose.Schema({
    type: String,
    content: String,
    direction: String
});
const movieSchema = new mongoose.Schema({
    type: String,
    id: String,
    name:String
});
const User = mongoose.model('recommaUser', {
    username: String,
    password: String,
    email:String,
    watchlist:[movieSchema],
    favourites:[movieSchema],
    watched:[movieSchema],
    chats:Map,
    securtiyQs:String,
    answer:String
    
});
const commentSchema = new mongoose.Schema({
    comments: {
        type: Map,
        of: [{
            type: new mongoose.Schema({
                email: String,
                username: String,
                content:String
            })
        }]
    }
});
const Comment = mongoose.model('Comment', commentSchema);

const urlDb="mongodb+srv://abdullah92:UEmCu_t-ssXs8Xe@tasks.ixtcg1y.mongodb.net/mongo-db?retryWrites=true&w=majority";
mongoose.connect(urlDb)
.then((res)=>{
    console.log("<<<<connected to db>>>>");
    app.listen(5000)
}).catch((err)=>{
    console.log(err);
})

app.post('/addUser',async (req,res)=>{
    let temp=[];
    const user=new User(req.body);
    //console.log(user);
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.email===req.body.email || user.username===req.body.username);
        });
    })
    if(temp.length!==0){
        return res.json(null);
    }
    user.save()
    .then((response)=>{
        return res.json(response);
    })
})

app.get("/loginUsername/:username/:password",async (req,res)=>{
    let temp=[];
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.username===req.params.username);
        });
    })
    if(temp.length===0 || temp[0].password!=req.params.password){
        return res.json(null);
    }
    return res.status(200).json(temp[0]);
});

app.get("/loginEmail/:email/:password",async (req,res)=>{
    let temp=[];
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.email===req.params.email);
        });
    })
    if(temp.length===0 || temp[0].password!=req.params.password){
        return res.json(null);
    }
    return res.status(200).json(temp[0]);
});



app.get("/getQs/:email",async (req,res)=>{
    let temp=[];
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.email===req.params.email);
        });
    })
    if(temp.length===0){
        return res.json(null);
    }
    return res.status(200).json({qs:temp[0].securtiyQs,ans:temp[0].answer});
});
app.get("/getUserObj/:email",async (req,res)=>{
    let temp=[];
    let search= await User.find().then((response)=>{
        temp=response.filter((user)=>{
            return (user.email===req.params.email);
        });
    })
    if(temp.length===0){
        return res.json(null);
    }
    return res.status(200).json(temp[0]);
});


app.post('/addComment', async (req, res) => {
    const { movieId, email, username, content } = req.body;
    const newComment = { email, username, content };
    //console.log(newComment,"hi");

    try {
        let commentDocument = await Comment.findOne();

        if (!commentDocument) {
            commentDocument = new Comment({
                comments: {
                    [movieId]: [newComment]
                }
            });
        } else {
            if (commentDocument.comments.has(movieId)) {
                commentDocument.comments.get(movieId).push(newComment);
            } else {
                commentDocument.comments.set(movieId, [newComment]);
            }
        }

        await commentDocument.save();
        return res.json(commentDocument);
    } catch (err) {
        console.error('Error adding comment:', err);
        return res.status(500).json({ error: 'Error adding comment' });
    }
});

app.get('/getComments/:movieId', async (req, res) => {
    const { movieId } = req.params;

    try {
        const commentDocument = await Comment.findOne();
        if (commentDocument && commentDocument.comments.has(movieId)) {
            return res.json(commentDocument.comments.get(movieId));
        } else {
            return res.json([]);
        }
    } catch (err) {
        console.error('Error retrieving comments:', err);
        return res.status(500).json({ error: 'Error retrieving comments' });
    }
});
app.post('/updateUser', async (req, res) => {
    const { email, updatedUser } = req.body;
    //console.log(updatedUser);
    try {
        const user = await User.findOneAndUpdate({ email: email }, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Error updating user' });
    }
});
app.post('/aiRecommend', async (req, res) => {
    const { text } = req.body;
    let newText=`i want any name of movie or series you will write to be in a square bracket the name only,i liked ${text} movie and series  recommend to me similar movies or series,at least 20 `
    try {
        const apiKey = process.env.API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(newText);
        const response = await result.response;
        const generatedText = response.text();

        const regex = /\[(.*?)\]/g;
        const matches = [];
        let match;

        while ((match = regex.exec(generatedText)) !== null) {
            matches.push(match[1]);
        }
        res.status(200).json({ movies: matches });
    } catch (err) {
        console.error('Error generating content:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/aiChat', async (req, res) => {
    const { query,movieName } = req.body;
    
    let newText=`dont say anything about the query said to you,you are a movies website chat bot and any thing written after "query:" is a queries from customers and your response has to be max 3 lines
    (we are talking about ${movieName})
    the is query:${query}`;
    //console.log(newText);
    try {
        const apiKey = process.env.API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(newText);
        const response = await result.response;
        const generatedText = response.text();
        res.status(200).json({ res: generatedText });
    } catch (err) {
        console.error('Error generating content:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


