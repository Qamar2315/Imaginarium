// server/controllers/chatController.js (updated saveMessage function)
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import Gemini

exports.saveMessage = async (req, res) => {
    try {
        const userId = req.user.uid; // From auth middleware
        const characterId = req.params.characterId;
        const userMessageText = req.body.text; // The message sent by the user

        // 1. Get the character description (you'll need to implement this based on how you store it)
        const character = await Character.findById(characterId); // Assuming Character model
        const characterDescription = character.description || ""; // Handle case where description might be missing


        // 2. Construct the Gemini prompt
        const prompt = `You are a character with the following description:\n${characterDescription}\n\nUser: ${userMessageText}\nCharacter:`; // Include character description in prompt


        // 3. Call Gemini API
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });


        const geminiResponse = await model.generateContent({ prompt });


        const aiMessageText = geminiResponse.response.text();

        // 4. Create and save the messages
        const newuserMessage = new Message({ sender: 'user', text: userMessageText});
        await newuserMessage.save();
        const newAiMessage = new Message({ sender: 'character', text: aiMessageText});
        await newAiMessage.save();



        let chat = await Chat.findOne({ user: userId, character: characterId });
        if (!chat) {
            chat = new Chat({ user: userId, character: characterId, messages: [] });
        }



        chat.messages.push(newuserMessage._id); // Add user's message first
        chat.messages.push(newAiMessage._id);
        await chat.save();


        res.status(201).json({ chat, message: newAiMessage});

    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: error.message }); // Appropriate error handling
    }
};
