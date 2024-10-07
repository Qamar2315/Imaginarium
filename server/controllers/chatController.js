const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Character = require('../models/Character');
const apiKey = process.env.GEMINI_API_KEY; // Make sure this is set
const genAI = new GoogleGenerativeAI({ apiKey }); // Correct initialization
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // Get the model instance

exports.saveMessage = async (req, res) => {
    try {
        let userId = req.user.uid;
        const user = await User.findOne({ uid: userId });
        userId = user._id;
        const characterId = req.params.characterId;
        const userMessageText = req.body.text;

        const character = await Character.findById(characterId);
        const characterDescription = character.description || "";

        // const prompt = `You are a character with the following description:\n${characterDescription}\n\nUser: ${userMessageText}\nCharacter:`

        // const geminiResponse = await model.generateContent(prompt); // Generate the response

        // const aiMessageText = geminiResponse.response.text(); // Access the generated text

        const aiMessageText = "Sorry currently the AI is disabled for this project";

        const newuserMessage = new Message({ sender: 'user', text: userMessageText });
        await newuserMessage.save();
        const newAiMessage = new Message({ sender: 'character', text: aiMessageText });
        await newAiMessage.save();

        let chat = await Chat.findOne({ user: userId, character: characterId });
        if (!chat) {
            chat = new Chat({ user: userId, character: characterId, messages: [] });
        }

        chat.messages.push(newuserMessage._id);
        chat.messages.push(newAiMessage._id);
        await chat.save();

        res.status(201).json({ chat, message: newAiMessage });

    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.getChatHistory = async (req, res) => {
    try {
        const userId = req.user.uid;
        const characterId = req.params.characterId;
        const user = await User.findOne({ uid: userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const chat = await Chat.findOne({ user: user._id, character: characterId }).populate('messages'); // Populate the messages

        if (!chat) {
            return res.status(200).json({ messages: [] }); // Return empty array if no chat found
        }

        res.json(chat);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: error.message });
    }
};