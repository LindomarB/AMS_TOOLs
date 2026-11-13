function tokenCheck(req, res, next) {
    if(!req.token) {
        res.status(401);
        return res.json({message: 'Access denied (no valid token)'});
    }
    
    next();
}

exports.tokenCheck = tokenCheck;