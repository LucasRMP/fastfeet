import * as yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    /**
     * Validate the request body
     */
    const schema = yup.object().shape({
      name: yup
        .string()
        .required()
        .min(2),
      street: yup.string().required(),
      number: yup.string(),
      compliment: yup.string(),
      state: yup
        .string()
        .length(2)
        .required(),
      city: yup.string().required(),
      postal_code: yup
        .string()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const recipient = await Recipient.create(req.body);

    const {
      name,
      street,
      number,
      compliment,
      state,
      city,
      postal_code,
    } = recipient;

    return res.status(201).json({
      name,
      address: { street, number, compliment, state, city, postal_code },
    });
  }

  async update(req, res) {
    /**
     * Validate request body
     */
    const schema = yup.object().shape({
      name: yup.string().min(2),
      street: yup.string(),
      number: yup.string(),
      compliment: yup.string(),
      state: yup.string().length(2),
      city: yup.string(),
      postal_code: yup.string().length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'User not found' });
    }

    const {
      name,
      street,
      number,
      compliment,
      state,
      city,
      postal_code,
    } = await recipient.update(req.body);

    return res.status(200).json({
      name,
      address: { street, number, compliment, state, city, postal_code },
    });
  }
}

export default new RecipientController();
