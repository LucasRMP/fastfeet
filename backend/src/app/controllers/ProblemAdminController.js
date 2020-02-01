import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Recipient from '../models/Recipient';

class ProblemsAdminController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      attributes: ['delivery_id'],
    });

    const idsWithProblems = problems.map(p => p.delivery_id);

    const deliveries = await Delivery.findAll({
      where: {
        id: {
          [Op.in]: idsWithProblems,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'postal_code',
            'compliment',
            'state',
            'city',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json(deliveries);
  }

  async update(req, res) {
    const { problem_id } = req.params;

    /**
     * Check if problem exists
     */
    const problem = await DeliveryProblem.findByPk(problem_id);
    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    /**
     * Check if delivery exists
     */
    const delivery = await Delivery.findByPk(problem.delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    /**
     * Check if delivery is alredy canceled
     */
    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery alredy canceled' });
    }

    await delivery.update({ canceled_at: new Date() });
    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'postal_code',
            'compliment',
            'state',
            'city',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    await Queue.add(CancelDeliveryMail.key, { delivery });

    return res.status(200).json(delivery);
  }
}

export default new ProblemsAdminController();
