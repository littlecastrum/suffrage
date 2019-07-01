"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var homeController = __importStar(require("./controllers/home"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 8888);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    };
    Server.prototype.start = function () {
        var PORT = this.app.get('port');
        this.app.listen(PORT, function () {
            console.log("Example app listening on port http://localhost:" + PORT);
        });
    };
    Server.prototype.routes = function () {
        this.app.get('/', homeController.index);
        this.app.get('/users', homeController.users);
        this.app.get('/users/:id', homeController.user);
        this.app.post('/users/create', homeController.create);
        this.app.post('/login', homeController.login);
    };
    return Server;
}());
var server = new Server();
server.start();
