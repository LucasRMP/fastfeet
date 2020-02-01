import * as yup from 'yup';
import { isAfter, parseISO, getHours } from 'date-fns';

import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/newDeliveryMail';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryController {
  async store(req, res) {
    /**
     * Check if request body is valid
     */
    const schema = yup.object().shape({
      product: yup.string().required(),
      deliveryman_id: yup
        .number()
        .integer()
        .required(),
      recipient_id: yup
        .number()
        .integer()
        .required(),
      signature_id: yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    /**
     * Check if deliveryman exists
     */
    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    /**
     * Check if recipient exists
     */
    const recipientExists = await Recipient.findByPk(recipient_id);
    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    await Queue.add(NewDeliveryMail.key, { delivery });

    return res.json(delivery);
  }

  async index(req, res) {
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    /**
     * Check if delivery exists
     */
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async update(req, res) {
    /**
     * Check if request body is valid
     */
    const schema = yup.object().shape({
      product: yup.string(),
      deliveryman_id: yup.number().integer(),
      recipient_id: yup.number().integer(),
      signature_id: yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { id } = req.params;

    /**
     * Check if delivery exists
     */
    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { deliveryman_id, recipient_id, signature_id } = req.body;

    /**
     * Check if deliveryman exists
     */
    if (deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman not found' });
      }
    }

    /**
     * Check if recipient exists
     */
    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found' });
      }
    }

    /**
     * Check if signature exists
     */
    if (signature_id) {
      const signature = await File.findByPk(signature_id);
      if (!signature) {
        return res.status(400).json({ error: 'Signature not found' });
      }
    }

    /**
     * Check if canceled_at is in the body
     */
    const { start_date, end_date, canceled_at } = req.body;
    if (canceled_at) {
      return res.status(400).json({ error: 'Cancel date are not modifiable' });
    }

    /**
     * Check dates
     */
    const parsedStart = parseISO(start_date);
    const parsedEnd = parseISO(end_date);

    if (start_date) {
      const hour = getHours(parsedStart);
      if (hour < 8 || hour >= 18) {
        return res
          .status(400)
          .json({ error: 'Retrievs can be done only between 08:00 - 18:00h ' });
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        return res.status(400).json({ error: "The delivery hasn't started" });
      }
    }

    if (start_date && end_date) {
      if (isAfter(parsedStart, parsedEnd)) {
        return res
          .status(400)
          .json({ error: 'End date should be after the start' });
      }
    }

    await delivery.update(req.body);

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    /**
     * Check if delivery exists
     */
    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ ok: true });
  }
}

export default new DeliveryController();
