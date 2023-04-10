package com.yunhe.result;


import net.minidev.json.JSONObject;

public class Result extends JSONObject {

    private Result() {
        super();
    }

    public static Result success(Object data) {
        Result result = new Result();
        result.put(ResultConstant.HTTP.STATU_CODE, ResultConstant.HTTP.SUCCESS);
        result.put(ResultConstant.HTTP.RESULT_DATA, data);
        return result;
    }

    public static Result success(String message, Object data) {
        Result result = new Result();
        result.put(ResultConstant.HTTP.STATU_CODE, ResultConstant.HTTP.SUCCESS);
        result.put(ResultConstant.HTTP.RESULT_MESSAGE, message);
        result.put(ResultConstant.HTTP.RESULT_DATA, data);
        return result;
    }

    public static Result fail(String message, Object data) {
        Result result = new Result();
        result.put(ResultConstant.HTTP.STATU_CODE, ResultConstant.HTTP.FAIL);
        result.put(ResultConstant.HTTP.RESULT_MESSAGE, message);
        result.put(ResultConstant.HTTP.RESULT_DATA, data);
        return result;
    }

    public static Result error(String message, Object data) {
        Result result = new Result();
        result.put(ResultConstant.HTTP.STATU_CODE, ResultConstant.HTTP.ERROR);
        result.put(ResultConstant.HTTP.RESULT_MESSAGE, message);
        result.put(ResultConstant.HTTP.RESULT_DATA, data);
        return result;
    }

    public static Result bindingFail(String message) {
        Result result = new Result();
        result.put(ResultConstant.HTTP.STATU_CODE, ResultConstant.HTTP.NOT_BIND);
        result.put(ResultConstant.HTTP.RESULT_MESSAGE, message);
        return result;
    }

    public static Result notLogin(String message, Object data) {
        Result result = new Result();
        result.put(ResultConstant.HTTP.STATU_CODE, ResultConstant.HTTP.NOT_LOGIN);
        result.put(ResultConstant.HTTP.RESULT_MESSAGE, message);
        result.put(ResultConstant.HTTP.RESULT_DATA, data);
        return result;
    }
}
