
package com.pharma.backend.controller;

import com.pharma.backend.model.CartItem;
import com.pharma.backend.model.Order;
import com.pharma.backend.repository.CartRepository;
import com.pharma.backend.repository.OrderRepository;
import com.pharma.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    
    @GetMapping("/count")
    public long getOrdersCount() {
        return orderService.getOrdersCount();
    }

   
    @PostMapping("/place")
    public ResponseEntity<String> placeOrder() {
        List<CartItem> cartItems = cartRepository.findAll();

        if (cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        for (CartItem cartItem : cartItems) {
            Order order = new Order();
            order.setName(cartItem.getName());
            order.setPrice(cartItem.getPrice());
            order.setQuantity(cartItem.getQuantity());
            order.setMemberId(cartItem.getMemberId());
            order.setStatus("PLACED");

            orderRepository.save(order);
        }

        cartRepository.deleteAll(); 
        return ResponseEntity.ok("Order placed successfully");
    }
    
 
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}
