module.exports = (sequelize, DataTypes)=>{
    let Profile = sequelize.define("Profile", {
        bio:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
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