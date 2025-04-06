import userService from '../services/user/index.js';

const userController = {
  /**
   * Get all users
   */
  getUser: async (req, res) => {
    try {
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
      
      // Call the service layer
      const { users, total } = await userService.getUser({
        page: Number(page),
        pageSize: Number(pageSize),
        sort,
        search: search.trim()
      });
  
      if (!users.length) {
        return res.status(200).json({ 
          message: "No users found", 
          users: [], 
          total 
        });
      }
  
      res.status(200).json({ users, total });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      return res.status(200).json({ success: true, data: user, message: 'User fetched successfully' });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Create a new user
   */
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      return res.status(201).json({ success: true, data: newUser, message: 'User created successfully' });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Edit user details
   */
  editUser: async (req, res) => {
    try {
      const updatedUser = await userService.editUser(req.params.id, req.body);
      return res.status(200).json({ success: true, data: updatedUser, message: 'User updated successfully' });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Delete a user by ID
   */
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      return res.status(200).json({ success: true, data: deletedUser, message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

export default userController;
