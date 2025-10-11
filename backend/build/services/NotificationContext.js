var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'inversify';
import { isUserOnline } from '../config/onlineUsers.js';
import { TYPES } from '../types.js';
let NotificationContext = class NotificationContext {
    constructor(emailStrategy, uiStrategy) {
        this.emailStrategy = emailStrategy;
        this.uiStrategy = uiStrategy;
    }
    sendNotification(event, data) {
        const { user } = data;
        if (isUserOnline(user._id.toString())) {
            this.uiStrategy.sendNotification(event, data);
        }
        else {
            this.emailStrategy.sendNotification(event, data);
        }
    }
};
NotificationContext = __decorate([
    injectable(),
    __param(0, inject(TYPES.EmailNotificationStrategy)),
    __param(1, inject(TYPES.UINotificationStrategy)),
    __metadata("design:paramtypes", [Object, Object])
], NotificationContext);
export default NotificationContext;
