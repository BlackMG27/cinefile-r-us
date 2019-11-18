module.exports = function(sequelize, DataTypes) {
    //sets up the table
    const User = sequelize.define("User", {
        //sets up the field criteria
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 8,
                max: 30
            }
        },
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        }
    });
    //sets up the one to many association
    User.associate = function(models) {
            User.hasMany(models.Review, {})
            User.hasMany(models.Comment, {})
        }
        // the user model
    return User;
}