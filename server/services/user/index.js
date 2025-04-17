import { UserSchema } from '../../models/userSchema.js'; 
import mongoose from 'mongoose';

const User = mongoose.model('User', UserSchema);

const userService = {
  /**
   * Get all users from the database
   */
  getUser: async ({ role, parentMongoId, page, pageSize, sort, search }) => {
    // Define allowed children per role
    const roleHierarchy = {
      Superadmin: ['Admin', 'Reseller', 'Agency', 'Client'],
      Admin: ['Reseller', 'Agency', 'Client'],
      Reseller: ['Agency', 'Client'],
      Agency: ['Client'],
      Client: [],
      Guest: []
    };
  
    // Prevent unauthorized access
    if (!roleHierarchy[role] || roleHierarchy[role].length === 0) {
      return { users: [], total: 0 };
    }
  
    // Determine which roles this user can view
    const allowedChildRoles = roleHierarchy[role];
  
    // Generate sorting object
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      return {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
    };
  
    const sortFormatted = sort ? generateSort() : {};
  
    // Build base query
    // 👉 Base query
    let query = {};
    if (role !== "Superadmin") {
      query = {
        parentId: parentMongoId,
        role: { $in: allowedChildRoles },
      };
    } else {
      // Superadmin sees all users – optionally filtered by allowed roles (or not at all)
      query = {}; // or { role: { $in: allowedChildRoles } } if needed
    }
    // Add search filters if present
    if (search) {
      query = {
        $and: [
          query,
          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { phone_number: { $regex: search, $options: "i" } },
            ],
          },
        ],
      };
    }
  
    const pageNumber = Math.max(1, page);
    const pageSizeNumber = Math.max(1, pageSize);

    const users = await User.find(query)
      .select("_id name email phone_number role createdAt services")
      .sort(sortFormatted)
      .skip((pageNumber - 1) * pageSizeNumber)
      .limit(pageSizeNumber);

    const total = await User.countDocuments(query);

    console.log("Users in service:",users);
  
    return { users, total };
  }
  
  ,

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
  },
  updateUserRoleService: async (email, parentId, role) => {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // If no user found with the provided email
    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }
    
    // Update the user's role and parentId
    user.role = role;
    user.parentId = parentId;
    
    // Save the updated user
    await user.save();
    console.log("User role updated:", user);
    
    return {
      uid: user.uid,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
  }

  
};



export default userService;
