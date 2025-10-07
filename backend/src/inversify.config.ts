import "reflect-metadata";
import { Container } from "inversify";
import dotenv from 'dotenv';
import { IEmailService } from "./interfaces/EmailService.js";
import NodemailerEmailService from "./services/NodemailerEmailService.js";
import { NotificationStrategy } from "./interfaces/i-notification-strategy.js";
import EmailNotificationStrategy from "./services/EmailNotificationStrategy.js";
import UINotificationStrategy from "./services/UINotificationStrategy.js";
import NotificationContext from "./services/NotificationContext.js";
import OTPService from "./services/OTPService.js";
import NotificationService from "./services/NotificationService.js";
import AuthController from "./controllers/AuthController.js";
import TicketController from "./controllers/TicketController.js";
import { TYPES } from "./types.js";

dotenv.config();

const container = new Container();

container.bind<IEmailService>(TYPES.IEmailService).to(NodemailerEmailService);
container.bind<NotificationStrategy>(TYPES.EmailNotificationStrategy).to(EmailNotificationStrategy);
container.bind<NotificationStrategy>(TYPES.UINotificationStrategy).to(UINotificationStrategy);
container.bind<NotificationContext>(TYPES.NotificationContext).to(NotificationContext);
container.bind<OTPService>(TYPES.OTPService).to(OTPService);
container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<TicketController>(TYPES.TicketController).to(TicketController);

export default container;