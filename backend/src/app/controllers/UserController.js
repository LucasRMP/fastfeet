import * as yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    /**
     * Validate body
     */
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    /**
     * Check if email is alredy registered
     */
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create(req.body);

    const { id, name, email } = user;

    return res.status(200).json({ id, name, email });
  }
}

export default new UserController();
