package com.fenquan.demo.service;

import com.fenquan.demo.entity.PushNews;

import java.util.List;

public interface PushNewsService {
    List<PushNews> getList(String companyName);
    List<PushNews> getLogin(String companyName);
}
