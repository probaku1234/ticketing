import { Publisher, Subjects, TicketCreatedEvent } from "@ysltickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated

}

