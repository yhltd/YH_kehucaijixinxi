package com.yunhe.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yunhe.entity.Form;
import com.yunhe.mapper.FormMapper;
import com.yunhe.service.IFormService;
import org.springframework.stereotype.Service;

/**
 * @author hui
 * @date 2023/5/16 9:05
 */
@Service
public class FormServiceImpl extends ServiceImpl<FormMapper,Form> implements IFormService {

}
