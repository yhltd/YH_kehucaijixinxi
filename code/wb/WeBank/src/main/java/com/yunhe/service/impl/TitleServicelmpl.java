package com.yunhe.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yunhe.entity.Title;

import com.yunhe.mapper.TitleMapper;

import com.yunhe.service.TitleService;

import org.springframework.stereotype.Service;

@Service
public class TitleServicelmpl  extends ServiceImpl<TitleMapper, Title> implements TitleService {

}
