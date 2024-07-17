const User = require('../models/user-model');
const Contact = require('../models/contact-model');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password');
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// get all contacts
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

//delete user by id

const deleteuserById = async (req, res, next) => {
    try {
         const id = req.params.id
         await User.deleteOne({_id:id});
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// get user by id

const getUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// update user by id

const updateUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// delete contacts by ID

const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getAllContacts,
    deleteuserById,
    getUserByID,
    updateUserByID,
    deleteContactById,
 
};
