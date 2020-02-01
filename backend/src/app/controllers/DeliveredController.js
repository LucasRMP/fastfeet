import * as yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveredController {
  async update(req, res) {
    const schema = yup.object().shape({
      end_date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { end_date } = req.body;
    const { id, delivery_id } = req.params;

    /**
     * Check if deliveryman is valid
     */
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    /**
     * Check if delivery exists
     */
    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    /**
     * Check if delivery belongs to deliveryman
     */
    if (delivery.deliveryman_id !== Number(id)) {
      return res
        .status(400)
        .json({ error: "Delivery doesn't belongs to the deliveryman " });
    }

    /**
     * Check if delivery has start_date
     */
    if (!delivery.start_date) {
      return res
        .status(400)
        .json({ error: "Delivery hasn't been started yet" });
    }

    /**
     * Check if delivery is open
     */
    if (delivery.end_date || delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery closed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Signature must be provided' });
    }

    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });

    await delivery.update({ end_date, signature_id: file.id });

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
}

export default new DeliveredController();
