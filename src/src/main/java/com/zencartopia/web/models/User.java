package com.zencartopia.web.models;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

//@Entity
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, unique = true)
//    private String username;
//
//    @Column(nullable = false)
//    private String password;
//
//    @Column(nullable = false, unique = true)
//    private String email;
//
//    private String role;
//
//    private String mobile;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Address> address = new ArrayList<Address>();
//
//    @Embedded
//    @ElementCollection
//    @CollectionTable(name="payment_information", joinColumns = @JoinColumn(name = "user_id"))
//    private List<PaymentInformation> paymentInformation = new ArrayList<PaymentInformation>();
//
//    private LocalDateTime createdAt;
//
//    public User() {
//
//    };
//
//    public User(Long id, String username, String password, String email, String role, String mobile, List<Address> address, List<PaymentInformation> paymentInformation, LocalDateTime createdAt) {
//        this.id = id;
//        this.username = username;
//        this.password = password;
//        this.email = email;
//        this.role = role;
//        this.mobile = mobile;
//        this.address = address;
//        this.paymentInformation = paymentInformation;
//        this.createdAt = createdAt;
//    }
//
//    // Getters and Setters
//
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public String getMobile() {
//        return mobile;
//    }
//
//    public void setMobile(String mobile) {
//        this.mobile = mobile;
//    }
//
//    public List<Address> getAddress() {
//        return address;
//    }
//
//    public void setAddress(List<Address> address) {
//        this.address = address;
//    }
//
//    public List<PaymentInformation> getPaymentInformation() {
//        return paymentInformation;
//    }
//
//    public void setPaymentInformation(List<PaymentInformation> paymentInformation) {
//        this.paymentInformation = paymentInformation;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        User user = (User) o;
//        return Objects.equals(id, user.id) && Objects.equals(username, user.username);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id, username);
//    }
//}


import java.sql.Timestamp;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    private String role;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;

    @Column(nullable = false, length = 255)
    private String address;

    @OneToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private PaymentInformation paymentInformation;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Timestamp.from(Instant.now());
    }
}

