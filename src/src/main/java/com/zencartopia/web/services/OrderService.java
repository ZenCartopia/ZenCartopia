package com.zencartopia.web.services;

import com.zencartopia.web.Exception.InsufficientStockException;
import com.zencartopia.web.Exception.ProductNotFoundException;
import com.zencartopia.web.models.*;
import com.zencartopia.web.repositories.OrderItemRepository;
import com.zencartopia.web.repositories.OrderRepository;
import com.zencartopia.web.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order placeOrder(OrderRequest orderRequest) {
        User user = orderRequest.getUser();
        List<CartItem> cartItems = orderRequest.getCartItems();
        String shippingAddress = orderRequest.getShippingAddress();
        String billingAddress = orderRequest.getBillingAddress();

        // Create order object
        Order order = new Order();
        order.setUser(user);
        order.setStatus("paid");
        order.setTotal(calculateTotal(cartItems));
        order.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        order.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        order.setShippingAddress(shippingAddress);
        order.setBillingAddress(billingAddress);

        // Save order to DB (Order gets an ID here)
        order = orderRepository.save(order);

        // Create order items for the order
        Order finalOrder = order;
        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(finalOrder);  // Set the current order

                    // Fetch the Product using its ID
                    Optional<Product> productOptional = productRepository.findById(cartItem.getProduct_id());
                    System.out.println(cartItem.getProduct_id());
                    if (productOptional.isPresent()) {
                        Product product = productOptional.get();
                        orderItem.setProduct(product);
                        orderItem.setQuantity(cartItem.getQuantity());
                        orderItem.setPrice(cartItem.getPrice());

                        // Check if the product has enough stock
                        int updatedQuantity = product.getAQuantity() - cartItem.getQuantity();
                        if (updatedQuantity < 0) {
                            // Insufficient stock, throw exception to trigger rollback
                            throw new InsufficientStockException("Not enough stock for product ID: " + product.getId());
                        }

                        // Update product quantity and save it back
                        product.setAQuantity(updatedQuantity);
                        productRepository.save(product);
                    } else {
                        // If product is not found, throw exception to trigger rollback
                        throw new ProductNotFoundException("Product with ID " + cartItem.getProduct_id() + " not found.");
                    }

                    return orderItem;
                })
                .collect(Collectors.toList());

        // Save all order items to DB
        orderItemRepository.saveAll(orderItems);

        // Return the saved order with items
        return order;
    }

    private BigDecimal calculateTotal(List<CartItem> cartItems) {
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            total = total.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }
        return total;
    }

    }
