package com.fenquan.demo.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("product_pushnews")
public class PushNews {

    private Integer _id;
    private String gsname;
    private String xtname;
    private String tpname1;
    private String tptop1;
    private String tpname2;
    private String tptop2;
    private String tpname3;
    private String tptop3;
    private String tpname4;
    private String tptop4;
    private String tpname5;
    private String tptop5;
    private String tpname6;
    private String tptop6;
    private String topkuan;
    private String topgao;
    private String xuankuan;
    private String xuangao;
    private Date date;
    private String textbox;
    private String beizhu1;
    private String beizhu2;
    private String beizhu3;
    private String beizhu4;
    private String beizhu5;
    private String beizhu6;
    private String beizhu7;
    private String beizhu8;
    private String beizhu9;
    private String beizhu10;
    private Date qidate;
    private Date zhidate;

}
