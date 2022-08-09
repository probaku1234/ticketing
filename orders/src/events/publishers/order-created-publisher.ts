import { Publisher, OrderCreatedEvent, Subjects } from "@ysltickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated

}
