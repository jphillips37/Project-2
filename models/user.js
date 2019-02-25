module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
            unique: true
          },

        password: {
        type: DataTypes.STRING,
        allowNull: false
        },

        lastLogin: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },

        user_points: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
        user_profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[1]
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return User;
};