import { Publisher, OrderCancelledEvent, Subjects } from "@ysltickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}