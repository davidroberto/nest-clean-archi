import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersService } from '../domain/use-case/get-orders.service';
import { OrderPresenter } from 'src/order/presentation/order.presenter';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getOrdersService: GetOrdersService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderService.createOrder(createOrderDto);
  }

  @Get()
  async getOrders(): Promise<OrderPresenter[]> {
    const orders = await this.getOrdersService.getOrders();

    return orders.map((order) => {
      return new OrderPresenter(order);
    });
  }
}
