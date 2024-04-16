import { PaidOrderService } from '../use-case/paid-order.service';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { OrderStatus } from '../enum/order-status.enum';

describe('paid order', () => {
  const order = new Order('John Doe', []);
  order.setShippingAddress('2 rue de la bagarre');

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order with the paid status', async () => {
    const paidOrderService = new PaidOrderService(orderRepositoryMock);

    const orderPaid = await paidOrderService.paidOrder('123');

    expect(orderPaid.status).toEqual(OrderStatus.PAID);
  });
});
