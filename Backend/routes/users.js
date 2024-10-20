import { Router } from "express";
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import User from "../models/User.js";

const router = Router();

router.get("/details", auth, roleCheck(["user"]) ,(req,res)=>{
    res.status(200).json({message:"user authenticated."});

});

router.get("/my-account", auth, roleCheck(["user"]) ,(req,res)=>{
    res.status(200).json({message:"user authenticated."});

});



router.get('/isAdmin/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    
        res.status(200).json({
            status: true,
            user: user,
        });
    
    
});

router.post('/getUser', async (req, res) => {
    try {
       
        const { email } = req.body;

       
        let user = await User.findOne({ email });
        if(!user){
            user = await Employee.findOne({ email });
        }

        if (!user) {
            
            return res.status(404).json({ error: 'User not found' });
        }

        // If user found, return the user data (e.g., username)
        res.json({ username: user.userName });
    } catch (error) {
        // If an error occurs, return a 500 status with an error message
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});


router.get("/getId/:selectedUser", async (req, res) => {
    console.log("get id")
    const id = req.params.selectedUser;
    console.log(id)
    try {
        let user = await User.findOne({ userName: id });
        if(!user){
            user = await Employee.findOne({ userName: id });
        }
        
        if (user) {
            
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


// Route to add chat groups to a user
router.put('/user/:userName/chatGroups', async (req, res) => {
    const userName = req.params.userName;
    const { chatGroups } = req.body;

    if (!Array.isArray(chatGroups) || chatGroups.length === 0) {
        return res.status(400).json({ message: 'Chat groups array is required and should not be empty' });
    }

    try {
        // Find the user by userName and update the chatGroups array
        const user = await User.findOneAndUpdate(
            { userName: userName },
            { $addToSet: { chatGroups: { $each: chatGroups } } }, // Use $addToSet with $each to add multiple items
            { new: true, useFindAndModify: false }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Chat groups added successfully', user });
    } catch (error) {
        console.error('Error updating chat groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to get all chat rooms by username
router.get('/user/:username/chatRooms', async (req, res) => {
    const username = req.params.username;
  
    try {
      // Find the user by username
      const user = await User.findOne({ userName: username });
  
      if (!user) {
        return res.status(404).json({ error: true, message: 'User not found' });
      }
  
      // Return the user's chat groups
      res.status(200).json({ error: false, chatRooms: user.chatGroups });
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      res.status(500).json({ error: true, message: 'Internal server error' });
    }
  });

  router.post('/groups/join', async (req, res) => {
    const { userId, groupId } = req.body;
    console.log(userId, groupId);
    
    try {
      // Assuming you have a User model and groups are stored in user document
      const user = await User.findOne({ userName: userId });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if the user is already a member of the group
      if (user.chatGroups.includes(groupId)) {
        return res.status(200).json({ message: 'Already a member', chatGroups: user.chatGroups });
      }
  
      // Add group to user's chatGroups if not already present
      console.log("Add group to user's chatGroups if not already present");
      user.chatGroups.push(groupId);
      await user.save();
  
      res.status(200).json({ message: 'Successfully joined', chatGroups: user.chatGroups });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // Endpoint to leave a group
router.post('/groups/leave', async (req, res) => {
    const { userId, groupId } = req.body;
    console.log(userId, groupId);
  
    try {
      const user = await User.findOne({ userName: userId });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const groupIndex = user.chatGroups.indexOf(groupId);
      if (groupIndex > -1) {
        user.chatGroups.splice(groupIndex, 1);
        await user.save();
        return res.status(200).json({ message: 'Successfully left', chatGroups: user.chatGroups });
      } else {
        return res.status(400).json({ message: 'Not a member of the group' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Route to update quizTaken
  router.put("/user/quiz/:id/quiz-taken", async (req, res) => {
    const userId = req.params.id;
    const { quizTaken } = req.body;
    console.log("UserId", userId, "Quiz Taken", quizTaken)
    try {
        const user = await User.findOneAndUpdate(
            { userName: userId },
            { quizTaken: quizTaken },
            { new: true }
        );

        if (!user) {
          console.log("not found")
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(user);
    } catch (error) {
      console.log("error")
        res.status(500).send({ message: "Error updating quizTaken field", error });
    }
});






export default router;