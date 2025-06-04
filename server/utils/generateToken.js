//function to generate a token for a user 
const generateToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token
} 
export default generateToken