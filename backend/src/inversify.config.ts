import "reflect-metadata";
import { Container } from "inversify";
import IEmailService from "./interfaces/EmailService.js";
import NodemailerEmailService from "./services/NodemailerEmailService.js";
import INotificationStrategy from "./interfaces/NotificationStrategy.js";
import EmailNotificationStrategy from "./services/EmailNotificationStrategy.js";
import UINotificationStrategy from "./services/UINotificationStrategy.js";
import NotificationContext from "./services/NotificationContext.js";
import OTPService from "./services/OTPService.js";
import NotificationService from "./services/NotificationService.js";
import AuthController from "./controllers/AuthController.js";
import TicketController from "./controllers/TicketController.js";
import { TYPES } from "./types.js";

const container = new Container();

container.bind<IEmailService>(TYPES.IEmailService).to(NodemailerEmailService);
container.bind<INotificationStrategy>(TYPES.EmailNotificationStrategy).to(EmailNotificationStrategy);
container.bind<INotificationStrategy>(TYPES.UINotificationStrategy).to(UINotificationStrategy);
container.bind<NotificationContext>(TYPES.NotificationContext).to(NotificationContext);
container.bind<OTPService>(TYPES.OTPService).to(OTPService);
container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<TicketController>(TYPES.TicketController).to(TicketController);

export default container;
