package io.cproject.backend.service;

import org.springframework.stereotype.Service;
import java.math.BigInteger;
import java.security.SecureRandom;

@Service
public class CodeGeneratorService {
    private static final String NUMBERS = "1234567890";

    public static String generateCode(int length) {
        SecureRandom random = new SecureRandom();
        return new BigInteger(length * 5, random).toString(32).substring(0, length);
    }
}

