import { Listener, OrderCreatedEvent, Subjects } from "@ysltickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName: string = queueGroupName

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)

        if (!ticket) {
            throw new Error('Ticket not found')
        }

        ticket.set({orderId: data.id})

        await ticket.save()

        msg.ack()
    }
}