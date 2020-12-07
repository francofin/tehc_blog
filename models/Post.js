const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }
// write validator so the column with the froeign key in the post can be validated with the user. 

Post.init(
    {
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          body: {
            type: DataTypes.STRING, 
            allowNull: false
          },
          post_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isURL: true
            }
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
          }
        },
        {
          sequelize,
          freezeTableName: true,
          underscored: true,
          modelName: 'post'
        }
);

module.exports = Post;