module.exports = (sequelize, DataTypes) => {
    const Trips = sequelize.define("Trips", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startingOdometer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endingOdometer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        miles: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tips: {
            type: DataTypes.INTEGER,
        },
        hours: {
            type: DataTypes.INTEGER,
        },
        wage: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
        }
    });
    return Trips;
};