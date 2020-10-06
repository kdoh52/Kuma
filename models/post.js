module.exports = (sequelize, DataTypes)=>{
    let Post = sequelize.define("Post",{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        profile_picture:{
            type: DataTypes.BLOB,
            allowNull: true,
        }
    });
    //Relation to User model
    Post.associate = (models)=>{
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        });
    }
    return Post;
};