import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js';
import { User } from '../models/user.model.js';


// it's work -> someone is making a request get user details -> authorize middleware -> verify -> if valid -> next -> get user details
export const authorize = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith(`Bearer `)) {
      token = authHeader.split(" ")[1]
    }

    if (!token) {
      const error = new Error('Token not provided');
      error.statusCode = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, JWT_SECRET)

    const user = await User.findById(decoded.userId).select("-password")

    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message })
  }
}