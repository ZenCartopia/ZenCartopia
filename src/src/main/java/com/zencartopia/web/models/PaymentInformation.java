package com.zencartopia.web.models;//package com.zencartopia.web.models;
//
//import jakarta.persistence.Embeddable;
//import java.util.Objects;
//
//@Embeddable
//public class PaymentInformation {
//
//    private String cardHolderName;
//
//    public PaymentInformation(String cardHolderName, String cardNumber, String cardType, String expiryDate, String billingAddress, String cvv) {
//        this.cardHolderName = cardHolderName;
//        this.cardNumber = cardNumber;
//        this.cardType = cardType;
//        this.expiryDate = expiryDate;
//        this.billingAddress = billingAddress;
//        this.cvv = cvv;
//    }
//
//    private String cardNumber;
//
//    private String cardType; // e.g., VISA, MasterCard, etc.
//
//    private String expiryDate; // Format: MM/YY
//
//    private String billingAddress;
//
//    private String cvv;
//
//    // Getters and Setters
//    public String getCardHolderName() {
//        return cardHolderName;
//    }
//
//    public void setCardHolderName(String cardHolderName) {
//        this.cardHolderName = cardHolderName;
//    }
//
//    public String getCardNumber() {
//        return cardNumber;
//    }
//
//    public void setCardNumber(String cardNumber) {
//        this.cardNumber = cardNumber;
//    }
//
//    public String getCardType() {
//        return cardType;
//    }
//
//    public void setCardType(String cardType) {
//        this.cardType = cardType;
//    }
//
//    public String getExpiryDate() {
//        return expiryDate;
//    }
//
//    public void setExpiryDate(String expiryDate) {
//        this.expiryDate = expiryDate;
//    }
//
//    public String getBillingAddress() {
//        return billingAddress;
//    }
//
//    public void setBillingAddress(String billingAddress) {
//        this.billingAddress = billingAddress;
//    }
//
//    public String getCvv() {
//        return cvv;
//    }
//
//    public void setCvv(String cvv) {
//        this.cvv = cvv;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        PaymentInformation that = (PaymentInformation) o;
//        return Objects.equals(cardNumber, that.cardNumber) &&
//                Objects.equals(expiryDate, that.expiryDate);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(cardNumber, expiryDate);
//    }
//}

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
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
