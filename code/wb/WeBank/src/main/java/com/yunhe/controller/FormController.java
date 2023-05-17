package com.yunhe.controller;

import com.yunhe.entity.Form;
import com.yunhe.service.IFormService;
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

    @PostMapping ("/save")
    public Result saveData( @RequestBody Form form){
//        System.out.println(form.getText());
        form.setHtml(form.getHtml());
        form.setAddtime(new Date());
        boolean save = formService.save(form);
        return Result.success(save);
    }
}
