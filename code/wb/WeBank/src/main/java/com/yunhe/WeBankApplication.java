package com.yunhe;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
//@MapperScan("com.yuhe.mapper")
public class WeBankApplication {
    public static void main(String[] args) {
        SpringApplication.run(WeBankApplication.class);
    }
}

