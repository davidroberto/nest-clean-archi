import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderCreatedEvent } from '../event/order-created.event';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderItems = createOrderDto.orderItems.map(
      (orderItem) =>
        new OrderItem(
          orderItem.productName,
          orderItem.quantity,
          orderItem.price,
        ),
    );

    const order = new Order(createOrderDto.customerName, orderItems);

    try {
      const orderPersisted = await this.orderRepository.save(order);

      this.eventEmitter.emit(
        'order.created',
        new OrderCreatedEvent(orderPersisted),
      );

      return orderPersisted;
    } catch (error) {
      throw new Error('An error occurred while creating the order');
    }
  }
}
