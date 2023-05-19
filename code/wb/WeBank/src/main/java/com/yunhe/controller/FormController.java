package com.yunhe.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.yunhe.entity.Form;
import com.yunhe.mapper.FormMapper;
import com.yunhe.service.IFormService;
import com.yunhe.util.PicBaseUtil;
import org.springframework.web.bind.annotation.*;

import com.yunhe.result.Result;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @author hui
 * @date 2023/5/15 18:33
 */
@RestController
@RequestMapping("/form")
public class FormController {

    @Resource
    IFormService formService;
    @Resource
    FormMapper formMapper;

    @PostMapping ("/save")
    public Result saveData( @RequestBody Form form){
        String url = "http://localhost:63342/Webank/page/wb/ces11.html";

        form.setUserId(1);
        form.setUrl(url);
        form.setHtml(form.getHtml());
        form.setVersion(1);
        form.setErweima(null);
        form.setAddtime(new Date());
        formService.save(form);
        return Result.success(url);
    }

    @PostMapping("/init10")
    public Result creatMa(@RequestBody Form form){
        String url = form.getUrl();
        String base= (new PicBaseUtil()).getBase64(url);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id",1);
        wrapper.eq("url",form.getUrl());
        Form one = formService.getOne(wrapper);
        UpdateWrapper<Form> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id",one.getId());
        form.setErweima(base);
        formService.update(form,updateWrapper);
        return Result.success("data:image/jpeg;base64,"+base);
    }

    @PostMapping("/init11")
    public Result findHtml(@RequestBody Form form){
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("user_id",1);
        wrapper.eq("url",form.getUrl());
        Form one = formService.getOne(wrapper);
        return Result.success(one.getHtml());
    }
}
