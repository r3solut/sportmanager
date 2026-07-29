"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hyper_express_1 = __importDefault(require("hyper-express"));
const auth_1 = require("./handlers/auth");
const match_1 = require("./handlers/match");
const app = new hyper_express_1.default.Server();
const PORT = parseInt(process.env.PORT || '8080');
// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS')
        return res.status(200).send('');
    next();
});
const apiRouter = new hyper_express_1.default.Router();
apiRouter.post('/auth/register', auth_1.registerHandler);
apiRouter.post('/auth/login', auth_1.loginHandler);
apiRouter.get('/matches/live', match_1.getLiveMatchesHandler);
app.use('/api/v1', apiRouter);
app.listen(PORT)
    .then(() => console.log(`SportManager API running on port ${PORT}`))
    .catch((err) => console.error('Failed to start server', err));
