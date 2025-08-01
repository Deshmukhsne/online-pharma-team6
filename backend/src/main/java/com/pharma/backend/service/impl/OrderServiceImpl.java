
package com.pharma.backend.service.impl;

import com.pharma.backend.repository.OrderRepository;
import com.pharma.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public long getOrdersCount() {
        return orderRepository.countOrders();
    }
}
