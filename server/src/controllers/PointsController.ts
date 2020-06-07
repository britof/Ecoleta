import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController {
    async create(req: Request, res: Response) 
    {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;
    
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf  
        }; 
    
        //insert point in database, saving the correspondig id as a single item array
        const insertedIds = await trx('points').insert(point);        
    
        const point_id = insertedIds[0];
    
        //create an array with the paired point and item ids
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });
    
        //create the relationship point*items (N to N) inserting the corresponding ids
        await trx('point_items').insert(pointItems);

        await trx.commit();
        
        return res.json({
           id:  point_id,
            ...point
        });
    }

    async index(req: Request, res: Response)
    {
        const { city, uf, items } = req.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            return res.json(points);
    }

    async show(req: Request, res: Response)
    {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point)
        {
            return res.status(400).json({ message: 'Point not found'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return res.json({point, items});
    }
};



export default PointsController;