import { Order } from 'src/order/domain/entity/order.entity';

export class OrderCreatedEvent {
  public readonly payload: Order;

  constructor(order: Order) {
    this.payload = order;
  }
}
