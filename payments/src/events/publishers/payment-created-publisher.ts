import { Subjects, Publisher, PaymentCreatedEvent } from "@ysltickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
