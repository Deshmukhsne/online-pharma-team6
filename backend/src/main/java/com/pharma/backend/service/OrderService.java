package com.pharma.backend.service;

import com.pharma.backend.model.Order;

import java.util.List;

public interface OrderService {
    long getOrdersCount();

    Order updateOrderStatus(Long id, String status);

    List<Order> getAllOrders();
}
