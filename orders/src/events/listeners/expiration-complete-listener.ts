import { Listener, Subjects, ExpirationCompleteEvent, OrderStatus } from "@ysltickets/common";
import { Message } from 'node-nats-streaming'
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    queueGroupName: string = queueGroupName
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message): void {
        const order = await Order.findById(data.orderId).populate('ticket')

        if (!order) {
            throw new Error('Order not found')
        }

        order.set({
            status: OrderStatus.Cancelled,
            ticket: null
        })
        await order.save()

        await new OrderCancelledPublisher(this.client).publish(
            {
                id: order.id,
                version: order.version,
                ticket: {
                    id: order.ticket.id
                }
            }
        )

        msg.ack()
    }
}