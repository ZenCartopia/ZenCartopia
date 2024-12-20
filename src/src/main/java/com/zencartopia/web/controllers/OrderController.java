package com.zencartopia.web.controllers;

import com.zencartopia.web.models.*;
import com.zencartopia.web.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place-order")
    public Order placeOrder(@RequestBody OrderRequest orderRequest) {
        // Place the order using the service
        return orderService.placeOrder(orderRequest);
    }
}
