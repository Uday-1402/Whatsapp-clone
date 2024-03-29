import getPrismaInstance from "../utils/PrismaClient.js";


export const checkUser = async(req,res,next)=>{
    try{
        const {email} = req.body;

        if(!email){
            return res.json({msg:"Email is required!",status:false});
        }
        const prisma = getPrismaInstance();
        const user = await prisma.User.findUnique({where:{email}});

        if(!user){
            return res.json({msg:"User not found!",status:false});
        }

        return res.json({msg:"User found",status:true,data:user});
    }catch(err){
        next(err);
    }
}

export const onboardUser = async(req,res,next)=>{
    try {
        const {email,name,about,image:profilePicture} = req.body;
        if(!email || !name || !profilePicture){
            return res.send("Email, Name and Profile Picture are required.");
        }

        const prisma = getPrismaInstance();

        await prisma.User.create({data:{email,name,about,profilePicture}});
        return res.json({msg:"Success",status:true});
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async(req, res,next) =>{
    try{
        const prisma = getPrismaInstance();
        const users = await prisma.User.findMany({
            orderBy:{name:"asc"},
            select:{
                id:true,
                email: true,
                name: true,
                profilePicture:true,
                about: true,
            },
        });
        const usersGroupedByInitialLetter = {};
        users.forEach((user)=>{
            const initialLetter = user.name.charAt(0).toUpperCase();
            if(!usersGroupedByInitialLetter[initialLetter]){
                usersGroupedByInitialLetter[initialLetter] = [];
            }
            usersGroupedByInitialLetter[initialLetter].push(user);
        });
        return res.status(200).send({users:usersGroupedByInitialLetter});
    }catch(err){
        next(err);
    }
}