package com.bookstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/pages/category.html")
    public String category() {
        return "pages/category";
    }

    @GetMapping("/pages/product.html")
    public String product() {
        return "pages/product";
    }

    @GetMapping("/pages/cart.html")
    public String cart() {
        return "pages/cart";
    }

    @GetMapping("/pages/wishlist.html")
    public String wishlist() {
        return "pages/wishlist";
    }

    @GetMapping("/pages/signin.html")
    public String signin() {
        return "pages/signin";
    }

    @GetMapping("/pages/register.html")
    public String register() {
        return "pages/register";
    }

    @GetMapping("/pages/checkout.html")
    public String checkout() {
        return "pages/checkout";
    }
}
