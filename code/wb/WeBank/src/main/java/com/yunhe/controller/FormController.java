package com.yunhe.controller;

import com.yunhe.entity.Form;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.yunhe.result.Result;

/**
 * @author hui
 * @date 2023/5/15 18:33
 */
@Controller
@RequestMapping(value = "/form",method = RequestMethod.POST)
public class FormController {

    @PostMapping("/save")
    public Result saveData(@RequestBody JSONObject json){
        System.out.println("123123"+json);
        return Result.success(json);
    }
}
