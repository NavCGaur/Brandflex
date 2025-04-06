import { UserSchema } from '../../models/userSchema.js'; 
import mongoose from 'mongoose';

const User = mongoose.model('User', UserSchema);

const userService = {
  /**
   * Get all users from the database
   */
   getUser: async ({ page, pageSize, sort, search }) => {
    // Generate sort object
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      return {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
    };
  
    const sortFormatted = sort ? generateSort() : {};
  
    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone_number: { $regex: search, $options: "i" } },
          ],
        }
      : {};
  
    // Fetch users from DB
    const users = await User.find(searchQuery)
      .select("_id name email phone_number role createdAt services")
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
  
    const total = await User.countDocuments(searchQuery);
  
    return { users, total };
  },
  

  /**
   * Get user by ID
   */
  getUserById: async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
      }
      const user = await User.findById(id);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  },

  /**
   * Create a new user
   */
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  /**
   * Edit user details
   */
  editUser: async (id, userData) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
      }
      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
      if (!updatedUser) throw new Error('User not found');
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  },

  /**
   * Delete user by ID
   */
  deleteUser: async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
      }
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error('User not found');
      return deletedUser;
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
};

export default userService;
