import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
    public async create({ request, response }: HttpContextContract) {
      const { username, name } = request.body();

      if(!username) {
        return response.status(400).json({ error: 'Username is required' })
      }

      const [findByUsername] = await User
                              .query()
                              .select('*')
                              .from('users')
                              .where('username', username)
      if (findByUsername) {
        return response.status(400).json({ error: 'Username already exists.' })
      }

      const user = await User.create({
        username,
        name,
      });

      return user;
    }

    public async index() {
      const all = await User.all();

      return all;
    }

    public async delete({ request, response }: HttpContextContract) {
      const { id } = request.params();

      const [findById] = await User
                              .query()
                              .select('*')
                              .from('users')
                              .where('id', id)
      if(!findById) {
        return response.status(400).json({ error: 'User not found' });
      }

      if(findById) {
        await User.query().delete().where('id', id);
      }

      return response.status(204);
    }

}
