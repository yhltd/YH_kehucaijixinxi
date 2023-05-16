package com.yunhe.controller;

import com.alibaba.fastjson.JSON;
import com.yunhe.entity.Form;
import com.yunhe.mapper.FormMapper;
import com.yunhe.service.IFormService;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.yunhe.result.Result;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;

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
    public Result saveData(JSONObject json){//
//        String data = request.getParameter("data");
//        JSONObject jsonO = JSONObject.fromObject(data);
//        System.out.println(jsonO);

//        Map<String,Object> mapdata = net.sf.json.JSONObject.fromObject(jsons);
//        System.out.println(mapdata);

        System.out.println((json.toString()));
        Form form = new Form();
        form.setText(json.toString());
        form.setAddtime(new Date());
        boolean save = formService.save(form);
        return Result.success(save);
//        return null;
    }

}
