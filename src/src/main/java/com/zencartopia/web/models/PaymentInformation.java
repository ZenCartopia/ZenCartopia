package com.zencartopia.web.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "payment_information")
public class PaymentInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "card_holder_name",  nullable = false, length = 50)
    private String cardHolderName;

    @Column(name = "card_number", nullable = false, length = 16)
    private String cardNumber;

    @Column(name = "cvv", nullable = false, length = 3)
    private String cvv;

    @Column(name = "expiry_date", nullable = false)
    private String expiryDate;

    @Column(name = "payment_type", nullable = false, columnDefinition = "ENUM('credit_card', 'paypal')")
    private String paymentType;
}
