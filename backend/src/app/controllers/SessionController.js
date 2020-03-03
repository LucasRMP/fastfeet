import jwt from 'jsonwebtoken';
import * as yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    /**
     * Validate req.body
     */
    const schema = yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { email, password } = req.body;

    /**
     * Check if user exists and his password
     */
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    const { id, name } = user;
    const admin = user.email === 'admin@fastfeet.com';

    return res.json({
      user: { id, email, name },
      token: jwt.sign({ id, admin }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  show(req, res) {
    return res.json({ msg: 'You are authenticated' });
  }
}

export default new SessionController();
