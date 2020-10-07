module.exports = (sequelize, DataTypes)=>{
    let Profile = sequelize.define("Profile", {
        bio:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pet_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        micro_chip: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        vet_clinic: {
            type: DataTypes.STRING,
        }
    });
    //Relations for Profile table
    Profile.associate = (models)=>{
        //Profile belongs to a user
        Profile.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        });
        //A profile has many posts
        Profile.hasMany(models.Post, {
            onDelete: "cascade",
        })
    }
    return Profile;
};