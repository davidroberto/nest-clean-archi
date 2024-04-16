import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { SetOrderInvoicingAddressDto } from '../dto/set-order-invoincing-address.dto';

export class SetOrderInvoicingAddressService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async setOrderInvoicingAddress(
    setOrderInvoicingAddressDto: SetOrderInvoicingAddressDto,
  ) {
    const order = await this.orderRepository.findById(
      setOrderInvoicingAddressDto.orderId,
    );

    order.setInvoiceAddress(setOrderInvoicingAddressDto.invoicingAddress);

    return this.orderRepository.save(order);
  }
}
