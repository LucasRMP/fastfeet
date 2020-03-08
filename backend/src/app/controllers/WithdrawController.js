import * as yup from 'yup';
import { startOfDay, endOfDay, parseISO, getHours } from 'date-fns';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class WithdrawController {
  async update(req, res) {
    const schema = yup.object().shape({
      start_date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { start_date } = req.body;
    const { id, delivery_id } = req.params;

    /**
     * Check if deliveryman exists
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
    if (delivery.start_date) {
      return res.status(400).json({ error: 'Delivery has alredy started' });
    }

    /**
     * Check if start_date is valid
     */
    const parsedDate = parseISO(start_date);
    const hour = getHours(parsedDate);
    if (hour >= 18 || hour < 8) {
      return res
        .status(400)
        .json({ error: 'Withdraw can only be done between 08:00 and 18:00' });
    }

    /**
     * Check how many deliveries the deliveryman started today
     */
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });
    if (deliveries.length >= 5) {
      return res
        .status(400)
        .json({ error: 'A deliveryman can make only 5 withdraws a day' });
    }

    await delivery.update({ start_date });

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

    return res.status(200).json(delivery);
  }
}

export default new WithdrawController();
