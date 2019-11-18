module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
        reviewId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        reviewTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        reviewText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [25, 1000]
            }
        },
        imdbId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Review.associate = function(models) {
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        Review.hasMany(models.Comment, {})
    }
    return Review;
}