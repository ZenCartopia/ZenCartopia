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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }
}
