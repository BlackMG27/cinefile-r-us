module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        commentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        commentText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [25, 500]
            }
        }
    });
    Comment.associate = function(models) {
        Comment.belongsTo(models.Review, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Comment;
}