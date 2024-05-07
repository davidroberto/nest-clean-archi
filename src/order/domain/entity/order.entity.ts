import { OrderItem } from '../entity/order-item.entity';
import { OrderStatus } from '../enum/order-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

@Entity()
export class Order {
  constructor(customerName: string, orderItems: OrderItem[]) {
    this.customerName = customerName;
    this.orderItems = orderItems;

    this.status = OrderStatus.CART;
    this.createdAt = new Date();
  }

  @CreateDateColumn()
  @Expose({ groups: ['group_orders'] })
  createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_orders'] })
  id: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  price: number;

  @Column()
  @Expose({ groups: ['group_orders'] })
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: ['group_orders'] })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddress: string | null;

  invoiceAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddressSetAt: Date | null;

  @Column()
  @Expose({ groups: ['group_orders'] })
  status: OrderStatus;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  paidAt: Date | null;

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + orderItem.getTotalPrice(),
      0,
    );
  }

  setShippingAddress(shippingAddress: string): void {
    if (shippingAddress === '') {
      throw new Error('Shipping address is required');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    this.shippingAddress = shippingAddress;
    this.shippingAddressSetAt = new Date();
    this.status = OrderStatus.SHIPPING_ADDRESS_SET;
  }

  pay() {
    if (this.status !== OrderStatus.SHIPPING_ADDRESS_SET) {
      throw new Error('You have to select a shipping adress');
    }

    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }

  setInvoiceAddress(invoiceAddress: string) {
    if (invoiceAddress === '') {
      throw new Error('Invoice address is required');
    }

    if (invoiceAddress.length > 100) {
      throw new Error(
        'Invoice address must be less than or equal to 100 characters',
      );
    }

    this.status = OrderStatus.INVOICE_ADDRESS_SET;
    this.invoiceAddress = invoiceAddress;
  }
}
