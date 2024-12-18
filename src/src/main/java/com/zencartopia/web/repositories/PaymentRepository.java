package com.zencartopia.web.repositories;

import com.zencartopia.web.models.PaymentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentInformation, Long> {
}
