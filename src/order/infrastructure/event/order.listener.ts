import { OnEvent } from '@nestjs/event-emitter';
import { Order } from '../../domain/entity/order.entity';

export class OrderListener {
  @OnEvent('order.created')
  handleOrderCreatedEvent(payload: Order) {
    console.log('Order created', payload);
  }
}
